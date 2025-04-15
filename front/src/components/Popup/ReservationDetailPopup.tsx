import { useEffect, useState } from "react";
import {
  X,
  User,
  Calendar,
  School,
  Presentation,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { createPortal } from "react-dom";
import Button from "../Button";
import { fetchReservationDetailDto } from "../../api/mypage/dto/fetchReservationDetailDto";
import { fetchReservationDetail } from "../../api/mypage/fetchReservationDetail";

// TODO 예약 취소, 변경 api 호출 내용

interface ReservationDetailPopupProps {
  reservationId: string;
  onClose: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
}

const ReservationDetailPopup = ({
  reservationId,
  onClose,
  onCancel,
  onEdit,
}: ReservationDetailPopupProps) => {
  const [data, setData] = useState<fetchReservationDetailDto | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  useEffect(() => {
    if (reservationId) {
      fetchReservationDetail(reservationId)
        .then(setData)
        .catch((err) => console.error("예약 정보 불러오기 실패:", err));
    } else {
      setData(null);
    }
  }, [reservationId]);

  useEffect(() => {
    const isCompleted =
      new Date(`${data?.reserve_date}T${data?.reserve_end_time}`) < new Date();
    setIsCompleted(isCompleted);
  }, [data]);

  if (!data) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col gap-5 bg-white w-full mx-10 max-w-md p-6 rounded-lg relative shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">예약 상세 정보</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transform transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <ul className="space-y-2 text-gray-800">
            <li className="flex gap-2">
              <User size={20} strokeWidth={1.6} />
              <strong>예약자 학번:</strong> {data.student_id}
            </li>
            <li className="flex gap-2">
              <Calendar size={20} strokeWidth={1.5} />
              <strong>예약 이용일 :</strong> {data.reserve_date} (
              {data.reserve_start_time} ~ {data.reserve_end_time})
            </li>
            <li className="flex gap-2">
              <School size={20} strokeWidth={1.5} />
              <strong>예약 장소:</strong> {data.building} {data.room}
            </li>
            <li className="flex gap-2">
              <Presentation size={20} strokeWidth={1.5} />
              <strong>예약 용도:</strong> {data.reserve_reason}
            </li>

            {data.equipment.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {data.equipment.map((eq, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-skyblue rounded-full text-sm font-medium"
                  >
                    # {eq}
                  </span>
                ))}
              </div>
            )}
          </ul>
          <ul className="space-y-2 border-gray border-2 p-4 rounded-2xl">
            <li>
              <p className="text-purple font-medium">
                * 문의 사항은 아래 정보를 참고해주세요
              </p>
            </li>
            <li>
              <strong>강의실 관리 부서:</strong> {data.contactDepartment} (
              {data.contactLocation})
            </li>

            <li>
              <strong>전화번호:</strong> {data.contactNumber}
            </li>
          </ul>
          <div className="flex flex-col items-center gap-2 py-5">
            {data.reservation_confirmed === 0 ? (
              <>
                <CircleX size={50} strokeWidth={1.5} color="#ff5e5e" />
                <span className="text-red font-semibold text-lg">
                  예약 반려
                </span>
              </>
            ) : isCompleted ? (
              <>
                <CircleCheck size={50} strokeWidth={1.5} color="#a5a5a5" />
                <span className="text-darkgray font-semibold text-lg">
                  이용 완료
                </span>
              </>
            ) : (
              <>
                <CircleCheck size={50} strokeWidth={1.5} color="#4461F2" />
                <span className="text-purple font-semibold text-lg">
                  예약 확정
                </span>
              </>
            )}
          </div>
        </div>
        {data.reservation_confirmed === 1 && !isCompleted && (
          <div className="flex justify-center gap-3">
            <Button text={"예약 변경"} isActive={true} onClick={onEdit} />
            <Button text={"예약 취소"} isActive={true} onClick={onCancel} />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ReservationDetailPopup;
