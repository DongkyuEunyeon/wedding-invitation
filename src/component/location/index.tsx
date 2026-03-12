import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용시
            <br />
            지하철 1호선 <b>남영역 1번출구</b>
            <br />
            → 갈월동 지하차도 지나 오른쪽 방면
            <br />
            지하철 4호선 <b>숙대입구역 10번출구</b>
            <br />
            <br />
            * 버스 이용시
            <br />
            숙대입구/갈월동 하차
            
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            <b>삼일교회 B관 지하주차장</b> 혹은
            <br />
            (청파로 304)
            <br />
            <b>숙명여자대학교 제2창학캠퍼스주차장</b> 이용
            <br />
            (청파로 47길 99)
          </div>
          <div />
          <div className="content">
            <b>
              ※ 교회 지하주차장은 협소하여 이른 만차가 예상됩니다.
              <br/>
              ※ 숙명여대 주차장 이용 시 교회까지 '도보 15분이 소요' 됩니다.
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
