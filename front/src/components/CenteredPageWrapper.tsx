import { ReactNode } from "react";
import BackgroundBlur from "./BackgroundBlur";

interface PageWrapperProps {
  children: ReactNode;
}

const CenteredPageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-4 relative">
      <BackgroundBlur />
      {children}
    </div>
  );
};

export default CenteredPageWrapper;
