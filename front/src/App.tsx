import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react"; // 🔥 꼭 있어야 함

const router = createBrowserRouter([
  {
    path: ROUTES.HOME.path,
    element: (
      <ProtectedRoute>
        <Layout>
          {React.createElement(ROUTES.HOME.element)}
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.LOGIN.path,
    element: React.createElement(ROUTES.LOGIN.element),
  },
  {
    path: ROUTES.SIGNUP.path,
    element: (
      <Layout>
        {React.createElement(ROUTES.SIGNUP.element)}
      </Layout>
    ),
  },
  {
    path: ROUTES.MAKE_RESERVATION.path,
    element: (
      <ProtectedRoute>
        <Layout>
          {React.createElement(ROUTES.MAKE_RESERVATION.element)}
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.UPDATE_RESERVATION.path,
    element: (
      <ProtectedRoute>
        <Layout>
          {React.createElement(ROUTES.UPDATE_RESERVATION.element)}
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.RESERVATION_STATUS.path,
    element: (
      <ProtectedRoute>
        <Layout>
          {React.createElement(ROUTES.RESERVATION_STATUS.element)}
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NOTICE.path,
    element: (
      <ProtectedRoute>
        <Layout>
          {React.createElement(ROUTES.NOTICE.element)}
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NOTICE_DETAIL.path,
    element: (
      <ProtectedRoute>
        <Layout>
          {React.createElement(ROUTES.NOTICE_DETAIL.element)}
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.MYPAGE.path,
    element: (
      <ProtectedRoute>
        <Layout>
          {React.createElement(ROUTES.MYPAGE.element)}
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.PROFILE_DETAIL.path,
    element: (
      <ProtectedRoute>
        <Layout>
          {React.createElement(ROUTES.PROFILE_DETAIL.element)}
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