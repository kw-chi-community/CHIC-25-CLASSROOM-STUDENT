import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Notice from "./pages/Notice/Notice";
import MyPage from "./pages/MyPage/MyPage";
import MakeReservation from "./pages/MakeReservation/MakeReservation";
import Login from "./pages/Login/Login";
import ReservationStatus from "./pages/ReservationStatus/ReservationStatus";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <Home />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/make-reservation",
    element: (
      <ProtectedRoute>
        <Layout>
          <MakeReservation />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/reservation-status",
    element: (
      <ProtectedRoute>
        <Layout>
          <ReservationStatus />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notice",
    element: (
      <ProtectedRoute>
        <Layout>
          <Notice />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/mypage",
    element: (
      <ProtectedRoute>
        <Layout>
          <MyPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
