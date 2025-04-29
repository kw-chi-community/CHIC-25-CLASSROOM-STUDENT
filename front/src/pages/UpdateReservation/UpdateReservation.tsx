import { useParams } from "react-router-dom";
import MakeAndUpdateReservation from "../../components/MakeAndUpdateReservation/MakeAndUpdateReservation";

const UpdateReservation = () => {
  const { reservationId } = useParams();
  return <MakeAndUpdateReservation reservationId={reservationId} />;
};

export default UpdateReservation;
