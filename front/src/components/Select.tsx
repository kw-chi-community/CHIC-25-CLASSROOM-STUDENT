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
      style={{
        WebkitAppearance: "none",
        MozAppearance: "none",
        appearance: "none",
        backgroundImage:
          "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "0.65em auto",
      }}
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
