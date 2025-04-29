import Input from "../../../components/Input";

interface Props {
  value: number;
  minRequired?: number;
  onChange: (value: number) => void;
}

const ParticipantInput = ({ value, minRequired = 0, onChange }: Props) => (
  <div>
    <label className="block mb-2 font-semibold">사용 인원</label>
    <Input
      type="number"
      value={String(value)}
      onChange={(e) => onChange(Number(e.target.value))}
    />
    {minRequired > 0 && value < minRequired && (
      <p className="text-red text-sm">
        {minRequired}명 이상만 사용할 수 있는 강의실입니다.
      </p>
    )}
  </div>
);

export default ParticipantInput;
