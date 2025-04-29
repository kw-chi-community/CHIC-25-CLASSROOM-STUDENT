import Input from "../../../components/Input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const PurposeInput = ({ value, onChange }: Props) => (
  <div>
    <label className="block mb-2 font-semibold">용도 입력 (최대 15자)</label>
    <Input
      type="text"
      maxLength={15}
      placeholder="예: 정보융합학부 개강총회"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default PurposeInput;
