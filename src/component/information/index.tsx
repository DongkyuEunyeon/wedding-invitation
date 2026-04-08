import { BRIDE_INFO, GROOM_INFO } from "../../const"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import KakaoPayLogo from "../../icons/kakao_pay.png";

interface AccountItem {
  relation: string;
  name: string;
  phone: string;
  account: string;
  kakaopay?: string; // 선택적 속성으로 정의
}

export const Information = () => {
  const { openModal, closeModal } = useModal()

  const openDonationModal = (type: 'groom' | 'bride') => {
    // 2. 가져온 데이터를 위에서 만든 AccountItem 배열 타입으로 캐스팅합니다.
    const info = (type === 'groom' ? GROOM_INFO : BRIDE_INFO) as AccountItem[];
    const title = type === 'groom' ? "신랑측 계좌번호" : "신부측 계좌번호";

    openModal({
      className: "donation-modal",
      closeOnClickBackground: true,
      header: <div className="title">{title}</div>,
      content: (
        <>
          {info.filter(({ account }) => !!account).map((item) => (
            <div className="account-info" key={item.relation}>
              <div>
                <div className="name">
                  <span className="relation">{item.relation}</span> {item.name}
                </div>
                <div>{item.account}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                <Button
                  className="copy-button"
                  style={{ width: "100%" }}
                  onClick={() => {
                    navigator.clipboard.writeText(item.account || "");
                    alert("복사되었습니다.");
                  }}
                >
                  복사하기
                </Button>

                {/* 이제 item.kakaopay에 접근해도 에러가 나지 않습니다. */}
                {item.kakaopay && (
                  <Button
                    className="kakaopay-button"
                    style={{
                      width: "100%",
                      backgroundColor: '#FEE500',
                      border: 'none',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      height: '40px' 
                    }}
                    onClick={() => {
                      if (item.kakaopay) window.location.href = item.kakaopay;
                    }}
                  >
                    <img
                      src={KakaoPayLogo}
                      alt="카카오페이 송금"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </>
      ),
      footer: <Button buttonStyle="style2" onClick={closeModal}>닫기</Button>,
    })
  }

  return (
    <LazyDiv className="card information">
      <h2 className="english">Information</h2>

      {/* 1. 식사 안내 */}
      <div className="info-card">
        <div className="label">식사 안내</div>
        <div className="content">
          식사시간: 11시 30분 ~ 14시 00분
          <br />
          장소: 지하 1층 연회장
        </div>
      </div>

      <br />

      {/* 2. 마음 전하기 */}
      <div className="info-card" style={{ marginTop: '0.5rem' }}>
        <div className="label">마음 전하기</div>
        <div className="content">
          부득이하게 참석이 어려워<br />마음을 전하고자 하시는 분들을 위해<br />계좌번호를 안내드립니다.
        </div>
        <div className="break" style={{ margin: '8px 0' }} />
        <Button style={{ width: "100%" }} onClick={() => openDonationModal('groom')}>
          신랑측 계좌번호 보기
        </Button>
        <div className="break" style={{ margin: '4px 0' }} />
        <Button style={{ width: "100%" }} onClick={() => openDonationModal('bride')}>
          신부측 계좌번호 보기
        </Button>
      </div>

      <br />

      {/* 3. 결혼 예배 (Coming Soon 최적화) */}
      <div className="info-card" style={{ marginTop: '0.5rem' }}>
        <div className="label">결혼 예배</div>
        <div className="content" style={{ position: 'relative' }}>
          {/* pointerEvents: 'none'으로 설정하여 모달 클릭을 방해하지 않음 */}
          <div style={{
            position: 'absolute',
            inset: '-4px',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(1.5px)',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            color: '#777',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            pointerEvents: 'none'
          }}>
            COMING SOON
          </div>

          <Button style={{ width: "100%", opacity: 0.5 }} disabled>식순지</Button>
          <div className="break" style={{ margin: '4px 0' }} />
          <Button style={{ width: "100%", opacity: 0.5 }} disabled>기도 카드</Button>
        </div>
      </div>
    </LazyDiv>
  )
}