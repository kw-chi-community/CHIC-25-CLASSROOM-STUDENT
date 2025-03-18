import React from "react";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  isActive: boolean;
  type?: "button" | "submit"; // 버튼 타입 지정 (기본값: "button")
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  isActive,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full mb-2 p-2 rounded-xl font-semibold transition duration-300 text-white text-lg tracking-wide shadow-md ${
        isActive
          ? "bg-purple bg-opacity-70 hover:bg-purple shadow-lg transform hover:scale-105"
          : "bg-gray cursor-not-allowed"
      }`}
      disabled={!isActive}
    >
      {text}
    </button>
  );
};

export default Button;
