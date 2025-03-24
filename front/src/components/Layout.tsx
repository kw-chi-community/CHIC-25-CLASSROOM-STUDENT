import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import MainHeader from "./Header/MainHeader";
import BackHeader from "./Header/BackHeader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative flex flex-col min-h-screen">
      {isHome ? <MainHeader /> : <BackHeader />}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
