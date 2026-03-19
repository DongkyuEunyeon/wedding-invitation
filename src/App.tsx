import { useRef } from "react" // 추가
import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Information } from "./component/information"
import { GuestBook } from "./component/guestbook"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import { STATIC_ONLY } from "./env"

function App() {
  // 특정 위치로 부드럽게 이동하는 함수
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="background">
      {/* 1. 상단바 추가 (디자인은 프로젝트에 맞춰 조정하세요) */}
      <nav className="top-nav" style={{
        position: 'fixed',
        top: 0,
        left: '50%',             // 중앙 정렬 유지
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '450px',
        height: '40px',
        zIndex: 10000,
        display: 'flex',         // Flexbox 사용
        justifyContent: 'center', // 내부 요소들을 중앙으로
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
        fontSize: '0.9rem',
        color: '#666',
        fontFamily: 'sjy, cursive',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        {/* 각 버튼에 flex: 1과 textAlign: center를 주어 동일한 비율로 나눕니다 */}
        <span
          onClick={() => scrollToId('location')}
          style={{ cursor: 'pointer', flex: 1, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          오시는길
        </span>
        <span
          onClick={() => scrollToId('gallery')}
          style={{ cursor: 'pointer', flex: 1, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          동규♥은연
        </span>
        <span
          onClick={() => scrollToId('information')}
          style={{ cursor: 'pointer', flex: 1, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          마음전하기
        </span>
      </nav>

      <div className="card-view" style={{ paddingTop: '50px' }}> {/* 상단바 높이만큼 여백 추가 */}
        {/* 2. 각 그룹에 id 부여 */}
        <LazyDiv className="card-group" id="cover">
          <Cover />
          <Invitation />
          <Calendar />
        </LazyDiv>

        <LazyDiv className="card-group" id="location">
          <Location />
        </LazyDiv>

        <LazyDiv className="card-group" id="gallery">
          <Gallery />
        </LazyDiv>

        <LazyDiv className="card-group" id="information">
          <Information />
          {!STATIC_ONLY && <GuestBook />}
        </LazyDiv>

        <ShareButton />
        <div style={{ height: '30px' }} />
      </div>
    </div>
  )
}

export default App