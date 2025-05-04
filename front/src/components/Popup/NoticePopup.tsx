import { createPortal } from "react-dom";
import Button from "../Button";
import { fetchNoticePopupDto } from "../../api/notice/dto/fetchNoticePopupDto";

interface NoticePopupProps {
  notice: fetchNoticePopupDto;
  onClose: () => void;
}

const NoticePopup = ({ notice, onClose }: NoticePopupProps) => {
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col bg-white w-full mx-4 max-w-md p-6 rounded-2xl relative shadow-xl border border-gray-200">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-3 text-center">{notice.title}</h2>
          <p className="text-center whitespace-pre-wrap leading-relaxed mb-6">
            {notice.contents}
          </p>
          <label className="flex items-center gap-2 mb-6 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
            />
            <span>다시 보지 않기</span>
          </label>
          <div className="w-full">
            <Button text={"확인"} onClick={onClose} isActive={true} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NoticePopup;
