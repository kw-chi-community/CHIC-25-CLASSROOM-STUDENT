import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Reservation from "./pages/Reservation/Reservation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // "/" URL에서는 Home 컴포넌트 렌더링
  },
  {
    path: "/reservation",
    element: <Reservation />, // "/notice" URL에서는 Notice 컴포넌트 렌더링
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
