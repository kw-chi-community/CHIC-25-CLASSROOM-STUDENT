import Input from "../../../components/Input";

interface DateSelectorProps {
  date: string;
  min: string;
  max: string;
  onChange: (value: string) => void;
}

const DateSelector = ({ date, min, max, onChange }: DateSelectorProps) => (
  <div>
    <label className="block mb-2 font-semibold">예약 날짜</label>
    <Input
      type="date"
      value={date}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default DateSelector;
