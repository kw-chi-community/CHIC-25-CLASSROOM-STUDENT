import { ReactNode } from "react";
import BackgroundBlur from "./BackgroundBlur";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen relative pt-16 px-4">
      <BackgroundBlur />
      {children}
    </div>
  );
};

export default PageWrapper;
