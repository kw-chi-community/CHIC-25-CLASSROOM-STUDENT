import Select from "../../../components/Select";

interface Props {
  value: string;
  options: { value: string; disabled: boolean }[];
  onChange: (value: string) => void;
}

const EndTimeSelector = ({ value, options, onChange }: Props) => (
  <div>
    <label className="block mb-2 font-semibold">종료 시간</label>
    <Select
      options={["종료 시간", ...options]}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default EndTimeSelector;
