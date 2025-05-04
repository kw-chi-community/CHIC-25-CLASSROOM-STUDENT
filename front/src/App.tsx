import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <ROUTES.HOME.element />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.LOGIN.path,
    element: <ROUTES.LOGIN.element />,
  },
  {
    path: ROUTES.SIGNUP.path,
    element: (
      <Layout>
        <ROUTES.SIGNUP.element />
      </Layout>
    ),
  },
  {
    path: ROUTES.MAKE_RESERVATION.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <ROUTES.MAKE_RESERVATION.element />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.UPDATE_RESERVATION.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <ROUTES.UPDATE_RESERVATION.element />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.RESERVATION_STATUS.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <ROUTES.RESERVATION_STATUS.element />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NOTICE.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <ROUTES.NOTICE.element />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NOTICE_DETAIL.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <ROUTES.NOTICE_DETAIL.element />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.MYPAGE.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <ROUTES.MYPAGE.element />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.PROFILE_DETAIL.path,
    element: (
      <ProtectedRoute>
        <Layout>
          <ROUTES.PROFILE_DETAIL.element />
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
