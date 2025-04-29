import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  min?: string;
  max?: string;
  label?: string;
  name?: string;
  readOnly?: boolean;
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
  label,
  name,
  readOnly,
}) => {
  return (
    <div className="w-full">
      {label && name && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-blak mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        min={min}
        max={max}
        readOnly={readOnly}
        className={`w-full p-2 rounded-xl text-lg transition-all ${
          readOnly
            ? "bg-transparent text-black border-transparent cursor-default focus:outline-none focus:ring-0 focus:border-transparent"
            : "border border-gray bg-skyblue text-gray-700 focus:ring-2 focus:ring-lightpurple focus:outline-none"
        } ${type === "date" ? "text-center" : ""}`}
        tabIndex={readOnly ? -1 : undefined}
      />
    </div>
  );
};

export default Input;
