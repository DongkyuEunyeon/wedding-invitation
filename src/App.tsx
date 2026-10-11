
import { useRef, useState } from "react"
import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Information } from "./component/information"
import { LazyDiv } from "./component/lazyDiv"
import HeartGame from "./component/game"
import { ShareButton } from "./component/shareButton"
import { STATIC_ONLY } from "./env"

function App() {
  const [showThanks, setShowThanks] = useState(true)

  const scrollToId = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="background">

      {/* 감사 인사 팝업 */}
      {showThanks && (
        <div
          onClick={() => setShowThanks(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20000,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "610px",
            }}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setShowThanks(false)}
              aria-label="감사 인사 팝업 닫기"
              style={{
                position: "absolute",
                top: "-14px",
                right: "-10px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#333",
                fontSize: "24px",
                lineHeight: 1,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                zIndex: 1,
              }}
            >
              ×
            </button>

            {/* 감사 인사 이미지 */}
            <img
              src={`${import.meta.env.BASE_URL}thanks.jpg`}
              alt="정동규, 이은연의 감사 인사"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "2px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </div>
      )}

      {/* 상단 메뉴 */}
      <nav
        className="top-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "100%",
          maxWidth: "450px",
          height: "40px",
          zIndex: 10000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(4px)",
          fontSize: "0.9rem",
          color: "#666",
          fontFamily: "sjy, cursive",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          boxSizing: "border-box",
        }}
      >
        <span
          onClick={() => scrollToId("location")}
          style={{
            cursor: "pointer",
            flex: 1,
            textAlign: "center",
          }}
        >
          오시는길
        </span>

        <span
          onClick={() => scrollToId("gallery")}
          style={{
            cursor: "pointer",
            flex: 1,
            textAlign: "center",
          }}
        >
          동규♥은연
        </span>

        <span
          onClick={() => scrollToId("information")}
          style={{
            cursor: "pointer",
            flex: 1,
            textAlign: "center",
          }}
        >
          마음전하기
        </span>
      </nav>

      <div className="card-view" style={{ paddingTop: "50px" }}>

        {/* 1. 커버 */}
        <LazyDiv className="card-group" id="cover">
          <Cover />
        </LazyDiv>

        {/* 2. 초대문 */}
        <LazyDiv className="card-group" id="invitation">
          <Invitation />
        </LazyDiv>

        {/* 3. 달력 */}
        <LazyDiv className="card-group" id="calendar">
          <Calendar />
        </LazyDiv>

        {/* 4. 오시는 길 */}
        <LazyDiv className="card-group" id="location">
          <Location />
        </LazyDiv>

        {/* 5. 갤러리 */}
        <LazyDiv className="card-group" id="gallery">
          <Gallery />
        </LazyDiv>

        {/* 6. 마음 전하기 */}
        <LazyDiv className="card-group" id="information">
          <Information />
        </LazyDiv>

        {/* 7. 축복 게임 */}
        <LazyDiv className="card-group" id="game">
          <div className="card">
            <h2
              className="english"
              style={{
                fontSize: "1.2rem",
                marginBottom: "8px",
              }}
            >
              Blessing Game
            </h2>

            <div
              style={{
                textAlign: "center",
                fontSize: "0.8rem",
                color: "#888",
                marginBottom: "10px",
              }}
            >
              하트를 모아 두 사람의 앞날을 축복해 주세요!
            </div>

            <HeartGame />
          </div>
        </LazyDiv>

        {/* 화환 안내 */}
        <div
          style={{
            padding: "0 2rem",
            margin: "1.5rem 0",
            textAlign: "center",
            fontSize: "0.78rem",
            lineHeight: 1.7,
          }}
        >
          예배 예식으로 검소하게 진행될 예정으로
          <br />
          화환은 축하해 주시는 마음만 감사히 받겠습니다.
        </div>

        {/* 공유 버튼 */}
        <ShareButton />

        <div style={{ height: "30px" }} />
      </div>
    </div>
  )
}

export default App
