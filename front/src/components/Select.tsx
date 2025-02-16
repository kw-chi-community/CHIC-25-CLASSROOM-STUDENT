import React from "react";

interface SelectProps {
  options: string[];
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
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
