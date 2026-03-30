import { useRef } from "react"
import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Information } from "./component/information"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import { STATIC_ONLY } from "./env"

function App() {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="background">
      <nav className="top-nav" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        margin: '0 auto',
        width: '100%',
        maxWidth: '450px',
        height: '40px',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
        fontSize: '0.9rem',
        color: '#666',
        fontFamily: 'sjy, cursive',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        boxSizing: 'border-box'
      }}>
        <span onClick={() => scrollToId('location')} style={{ cursor: 'pointer', flex: 1, textAlign: 'center' }}>오시는길</span>
        <span onClick={() => scrollToId('gallery')} style={{ cursor: 'pointer', flex: 1, textAlign: 'center' }}>동규♥은연</span>
        <span onClick={() => scrollToId('information')} style={{ cursor: 'pointer', flex: 1, textAlign: 'center' }}>마음전하기</span>
      </nav>

      <div className="card-view" style={{ paddingTop: '50px' }}>

        {/* 1. 첫 번째 박스: 커버만 */}
        <LazyDiv className="card-group" id="cover">
          <Cover />
        </LazyDiv>

        {/* 2. 두 번째 박스: 초대문 */}
        <LazyDiv className="card-group" id="invitation">
          <Invitation />
        </LazyDiv>

        {/* 3. 세 번째 박스: 달력 */}
        <LazyDiv className="card-group" id="calendar">
          <Calendar />
        </LazyDiv>

        {/* 4. 네 번째 박스: 오시는 길 */}
        <LazyDiv className="card-group" id="location">
          <Location />
        </LazyDiv>

        {/* 5. 다섯 번째 박스: 갤러리 */}
        <LazyDiv className="card-group" id="gallery">
          <Gallery />
        </LazyDiv>

        {/* 6. 여섯 번째 박스: 마음 전하기 */}
        <LazyDiv className="card-group" id="information">
          <Information />
        </LazyDiv>

        <ShareButton />
        <div style={{ height: '30px' }} />
      </div>
    </div>
  )
}

export default App
