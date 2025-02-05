import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Notice from "./pages/Notice/Notice";
import MyPage from "./pages/MyPage/MyPage";
import MakeReservation from "./pages/MakeReservation/MakeReservation";
import Login from "./pages/Login/Login";
import ReservationStatus from "./pages/ReservationStatus/ReservationStatus";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/make-reservation",
    element: (
      <Layout>
        <MakeReservation />
      </Layout>
    ),
  },
  {
    path: "/reservation-status",
    element: (
      <Layout>
        <ReservationStatus />
      </Layout>
    ),
  },
  {
    path: "/notice",
    element: (
      <Layout>
        <Notice />
      </Layout>
    ),
  },
  {
    path: "/mypage",
    element: (
      <Layout>
        <MyPage />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
