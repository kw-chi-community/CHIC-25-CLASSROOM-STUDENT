import Header from "./Header";
import Navigation from "./Navigation";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-16">{children}</main>{" "}
      {/* 바텀 네비 공간 확보 */}
      <Navigation />
    </div>
  );
};

export default Layout;
