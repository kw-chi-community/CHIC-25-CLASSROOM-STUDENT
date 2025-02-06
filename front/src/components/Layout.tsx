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
      <main className="flex-1">{children}</main>
      <Navigation />
    </div>
  );
};

export default Layout;
