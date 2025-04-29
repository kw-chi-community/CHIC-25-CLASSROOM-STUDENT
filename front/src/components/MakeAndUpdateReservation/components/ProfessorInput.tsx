import Input from "../../../components/Input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ProfessorInput = ({ value, onChange }: Props) => (
  <div>
    <label className="block mb-2 font-semibold">담당 교수</label>
    <Input
      type="text"
      maxLength={10}
      placeholder="담당 교수님 성함을 입력하세요"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ProfessorInput;
