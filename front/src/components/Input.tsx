import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  min?: string;
  max?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  maxLength,
  min,
  max,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={maxLength}
      min={min}
      max={max}
      className="w-full p-2 mb-2 border border-gray rounded-xl bg-skyblue text-gray-700 focus:ring-2 focus:ring-lightpurple focus:outline-none text-lg transition-all"
    />
  );
};

export default Input;
