import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-10-10 12:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd 낮 h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

export const HOLIDAYS = [5, 9]

export const LOCATION = "삼일교회 B관 1층 에덴홀"
export const LOCATION_KAKAOSHARE = "삼일교회 B관"
export const LOCATION_ADDRESS = "서울시 용산구 청파로 304"

// 카카오톡 공유 시 위치 정보로 사용할 주소.
// LOCATION 과 동일하게 설정해도 무방하나, 필요에 따라 좀 더 상세히 작성 가능.
export const SHARE_ADDRESS = LOCATION_KAKAOSHARE
export const SHARE_ADDRESS_TITLE = LOCATION_KAKAOSHARE

// 네이버 지도 및 카카오 네비게이션에 사용할 좌표. [경도, 위도] 형식.
export const WEDDING_HALL_POSITION = [126.9707100, 37.5468700]

// 네이버 지도의 웨딩홀 장소 ID
// 네이버 지도 웹페이지에서 웨딩홀 검색 후 URL에서 확인 가능.
// 예: https://map.naver.com/p/entry/place/1400840999 -> 13321741
export const NMAP_PLACE_ID = 1400840999

// 카카오 지도의 웨딩홀 장소 ID
// 카카오 지도 웹페이지에서 웨딩홀 검색 후 해당 장소에서 상세보기 클릭 시 URL에서 확인 가능.
// 예: https://place.map.kakao.com/8634826 -> 8634826
export const KMAP_PLACE_ID = 9815987

export const BRIDE_FULLNAME = "이은연"
export const BRIDE_FIRSTNAME = "은연"
export const BRIDE_TITLE = "소중한 딸"
export const BRIDE_FATHER = "이용환"
export const BRIDE_MOTHER = "조혜경"

export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-9340-8122",
    account: "토스뱅크 100125228278",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-3630-8122",
    account: "KB국민 824210480768",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-3265-4243",
    account: "KB국민 071210664501",
  },
]

export const GROOM_FULLNAME = "정동규"
export const GROOM_FIRSTNAME = "동규"
export const GROOM_TITLE = "소중한 아들"
export const GROOM_FATHER = "정한근"
export const GROOM_MOTHER = "최정순"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-4993-1024",
    account: "토스뱅크 100021226681",
    kakaopay: "https://link.kakaopay.com/__/MvdCQiF",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-9320-9137",
    account: "NH농협 81512756176045",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-3868-9137",
    account: "NH농협 3120045941041",
  },
]
