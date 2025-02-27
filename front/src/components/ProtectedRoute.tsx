import { Navigate } from "react-router-dom";

// sessionStorage에서 토큰 가져와 로그인 여부 확인
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem("accessToken");

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
