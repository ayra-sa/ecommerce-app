import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "large";
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "default",
  ...props
}) => {
  return (
    <button
      className={`py-2 px-5 rounded-lg border font-bold transition-colors duration-200 ${
        variant === "primary"
          ? "bg-green-500 text-white hover:bg-green-700"
          : "bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
      } ${size === "default" ? "w-auto" : "w-full"}`}
      {...props}
    />
  );
};

export default Button;
