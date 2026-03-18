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
        width: '100%',
        maxWidth: '450px', // card-view 너비와 맞추는 게 좋습니다
        height: '40px',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)', // 배경 흐리게 효과
        fontSize: '0.9rem',
        color: '#666',
        fontFamily: 'sjy, cursive'
      }}>
        <span onClick={() => scrollToId('gallery')} style={{ cursor: 'pointer' }}>갤러리</span>
        <span onClick={() => scrollToId('location')} style={{ cursor: 'pointer' }}>오시는길</span>
        <span onClick={() => scrollToId('information')} style={{ cursor: 'pointer' }}>마음전하기</span>
      </nav>

      <div className="card-view" style={{ paddingTop: '50px' }}> {/* 상단바 높이만큼 여백 추가 */}
        {/* 2. 각 그룹에 id 부여 */}
        <LazyDiv className="card-group" id="cover">
          <Cover />
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group" id="gallery">
          <Calendar />
          <Gallery />
        </LazyDiv>

        <LazyDiv className="card-group" id="location">
          <Location />
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