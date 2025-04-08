import React from "react";

interface Option {
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  options: (string | Option)[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 mb-2 border border-gray rounded-xl bg-skyblue text-gray-700 focus:ring-2 focus:ring-lightpurple focus:outline-none text-center text-lg transition-all"
    >
      {options.map((opt, index) => {
        const option =
          typeof opt === "string" ? { value: opt, disabled: false } : opt;
        const label = option.disabled
          ? `${option.value} (예약 불가)`
          : option.value;

        return (
          <option key={index} value={option.value} disabled={option.disabled}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
