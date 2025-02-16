import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  maxLength,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className="w-full p-2 mb-2 border border-gray rounded-xl bg-skyblue text-gray-700 focus:ring-2 focus:ring-lightpurple focus:outline-none text-center text-lg transition-all"
    />
  );
};

export default Input;
