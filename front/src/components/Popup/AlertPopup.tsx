import { createPortal } from "react-dom";
import Button from "../Button";

interface AlertPopupProps {
  text: string;
  onClose: () => void;
}

const AlertPopup = ({ text, onClose }: AlertPopupProps) => {
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col gap-5 bg-white w-full mx-10 max-w-md p-6 rounded-lg relative shadow-lg">
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium py-10 px-4 text-center">{text}</p>
          <Button text={"확인"} onClick={onClose} isActive={true} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AlertPopup;
