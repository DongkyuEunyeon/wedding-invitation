import { BRIDE_INFO, GROOM_INFO } from "../../const"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { AttendanceInfo } from "./attendance"
import { PROGRAM_LIST } from "../../images"
import { PRAYER_CARD } from "../../images"

export const Information = () => {
  const { openModal, closeModal } = useModal()

  return (
    <LazyDiv className="card information">
      <h2 className="english">Information</h2>

      {/* 1. 식사 안내 섹션 (최상단으로 이동) */}
      <div className="info-card">
        <div className="label">식사 안내</div>
        <div className="content">
          식사시간: 11시 30분 ~ 14시 00분
          <br />
          장소: 지하 1층 연회장
        </div>
      </div>

      <br />

      {/* 2. 마음 전하기 섹션 */}
      <div className="info-card" style={{ marginTop: '0.5rem' }}>
        <div className="label">마음 전하기</div>
        <div className="content">
          참석이 어려워 직접 축하해주지 못하는 분들을 위해 계좌번호를 기재하였습니다.
        </div>

        <div className="break" style={{ margin: '8px 0' }} />

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            openModal({
              className: "donation-modal",
              closeOnClickBackground: true,
              header: <div className="title">신랑측 계좌번호</div>,
              content: (
                <>
                  {GROOM_INFO.filter(({ account }) => !!account).map(({ relation, name, account }) => (
                    <div className="account-info" key={relation}>
                      <div>
                        <div className="name"><span className="relation">{relation}</span> {name}</div>
                        <div>{account}</div>
                      </div>
                      <Button className="copy-button" onClick={() => {
                        navigator.clipboard.writeText(account || "");
                        alert("복사되었습니다.");
                      }}>복사하기</Button>
                    </div>
                  ))}
                </>
              ),
              footer: <Button buttonStyle="style2" onClick={closeModal}>닫기</Button>,
            })
          }}
        >
          신랑측 계좌번호 보기
        </Button>

        <div className="break" style={{ margin: '4px 0' }} />

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            openModal({
              className: "donation-modal",
              closeOnClickBackground: true,
              header: <div className="title">신부측 계좌번호</div>,
              content: (
                <>
                  {BRIDE_INFO.filter(({ account }) => !!account).map(({ relation, name, account }) => (
                    <div className="account-info" key={relation}>
                      <div>
                        <div className="name"><span className="relation">{relation}</span> {name}</div>
                        <div>{account}</div>
                      </div>
                      <Button className="copy-button" onClick={() => {
                        navigator.clipboard.writeText(account || "");
                        alert("복사되었습니다.");
                      }}>복사하기</Button>
                    </div>
                  ))}
                </>
              ),
              footer: <Button buttonStyle="style2" onClick={closeModal}>닫기</Button>,
            })
          }}
        >
          신부측 계좌번호 보기
        </Button>
      </div>

      <br />

      {/* 3. 결혼 예배 섹션 (마지막으로 이동) */}
      <div className="info-card" style={{ marginTop: '0.5rem' }}>
        <div className="label">결혼 예배</div>
        <div className="content">
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              openModal({
                className: "donation-modal program-modal",
                closeOnClickBackground: true,
                content: (
                  <div style={{ padding: "0", textAlign: "center", overflow: "hidden" }}>
                    <img src={PROGRAM_LIST} alt="식순지" style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                ),
                footer: <Button buttonStyle="style2" className="bg-light-grey-color text-dark-color" onClick={closeModal}>닫기</Button>,
              })
            }}
          >
            식순지
          </Button>

          <div className="break" style={{ margin: '4px 0' }} />

          <Button
            style={{ width: "100%" }}
            onClick={() => {
              openModal({
                className: "donation-modal program-modal",
                closeOnClickBackground: true,
                content: (
                  <div style={{ padding: "0", textAlign: "center", overflow: "hidden" }}>
                    <img src={PRAYER_CARD} alt="기도 카드" style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                ),
                footer: <Button buttonStyle="style2" className="bg-light-grey-color text-dark-color" onClick={closeModal}>닫기</Button>,
              })
            }}
          >
            기도 카드
          </Button>
        </div>
      </div>
    </LazyDiv>
  )
}