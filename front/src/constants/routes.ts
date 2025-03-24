import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import MakeReservation from "../pages/MakeReservation/MakeReservation";
import ReservationStatus from "../pages/ReservationStatus/ReservationStatus";
import Notice from "../pages/Notice/Notice";
import MyPage from "../pages/MyPage/MyPage";

// 페이지 정보 상수
export const ROUTES = {
  HOME: {
    path: "/",
    element: Home,
    title: "홈",
  },
  LOGIN: {
    path: "/login",
    element: Login,
    title: "로그인",
  },
  SIGNUP: {
    path: "/signup",
    element: SignUp,
    title: "회원가입",
  },
  MAKE_RESERVATION: {
    path: "/make-reservation",
    element: MakeReservation,
    title: "예약하기",
  },
  RESERVATION_STATUS: {
    path: "/reservation-status",
    element: ReservationStatus,
    title: "예약현황",
  },
  NOTICE: {
    path: "/notice",
    element: Notice,
    title: "공지사항",
  },
  MYPAGE: {
    path: "/mypage",
    element: MyPage,
    title: "마이페이지",
  },
} as const;

export type RouteKey = keyof typeof ROUTES;
