import { ReactNode } from "react";
import BackgroundBlur from "../BackgroundBlur";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="relative h-screen">
      <BackgroundBlur />
      <div className="absolute top-[52px] left-0 right-0 bottom-0 overflow-y-auto">
        <div className="flex flex-col items-start justify-start min-h-full p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
