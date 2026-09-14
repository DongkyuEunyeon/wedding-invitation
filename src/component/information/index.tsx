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
  kakaopay?: string;
}

export const Information = () => {
  const { openModal, closeModal } = useModal()

  const openDonationModal = (type: 'groom' | 'bride') => {
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

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  marginTop: '12px',
                  alignItems: 'center'
                }}
              >
                {/* 복사하기 버튼 */}
                <Button
                  className="copy-button"
                  style={{
                    width: "100px",
                    height: "40px"
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(item.account || "");
                    alert("복사되었습니다.");
                  }}
                >
                  복사하기
                </Button>

                {/* 카카오페이 버튼 */}
                {item.kakaopay && (
                  <Button
                    className="kakaopay-button"
                    style={{
                      width: "100px",
                      height: "40px",
                      backgroundColor: '#f4de39',
                      border: 'none',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                    onClick={() => {
                      if (item.kakaopay) window.location.href = item.kakaopay;
                    }}
                  >
                    <img
                      src={KakaoPayLogo}
                      alt="카카오페이 송금"
                      style={{
                        height: '100%',
                        width: 'auto',
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
      footer: (
        <Button buttonStyle="style2" onClick={closeModal}>
          닫기
        </Button>
      ),
    })
  }

  return (
    <LazyDiv className="card information">
      <h2 className="english">Information</h2>

      {/* 1. 식사 안내 */}
      <div className="info-card">
        <div className="label">식사 안내</div>
        <div className="content">
          식사시간: 11시 30분 ~ 13시 30분
          <br />
          장소: 지하 1층 연회장
          <br />
          <span style={{ fontSize: '0.85em' }}>
            미취학 아동: 무료, 초등학생: 어린이 식권
          </span>
        </div>
      </div>

      <br />

      {/* 2. 마음 전하기 */}
      <div className="info-card" style={{ marginTop: '0.5rem' }}>
        <div className="label">마음 전하기</div>
        <div className="content">
          부득이하게 참석이 어려워<br />
          마음을 전하고자 하시는 분들을 위해<br />
          계좌번호를 안내드립니다.
        </div>

        <div className="break" style={{ margin: '8px 0' }} />

        <Button
          style={{ width: "100%" }}
          onClick={() => openDonationModal('groom')}
        >
          신랑측 계좌번호 보기
        </Button>

        <div className="break" style={{ margin: '4px 0' }} />

        <Button
          style={{ width: "100%" }}
          onClick={() => openDonationModal('bride')}
        >
          신부측 계좌번호 보기
        </Button>
      </div>

      <br />
      {/*
      {/* 3. 결혼 예배 }
      <div className="info-card" style={{ marginTop: '0.5rem' }}>
        <div className="label">결혼 예배</div>

        <div className="content">
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              window.open(
                `${import.meta.env.BASE_URL}/wedding-order.pdf`,
                "_blank"
              );
            }}
          >
            식순지
          </Button>

          <div className="break" style={{ margin: '4px 0' }} />

          <Button
            style={{ width: "100%" }}
            disabled
          >
            기도 카드
          </Button>
        </div>
      </div>
      */}
    </LazyDiv>
  )
}
