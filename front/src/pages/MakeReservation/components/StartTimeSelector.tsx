import Select from "../../../components/Select";

interface Props {
  value: string;
  options: { value: string; disabled: boolean }[];
  onChange: (value: string) => void;
}

const StartTimeSelector = ({ value, options, onChange }: Props) => (
  <div>
    <label className="block mb-2 font-semibold">시작 시간</label>
    <Select
      options={["시작 시간", ...options]}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default StartTimeSelector;
