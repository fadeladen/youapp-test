import React from "react";

type Props = {
  classname?: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  children?: any;
  disabled?: boolean;
};

const Button = (props: Props) => {
  const {
    disabled = false,
    classname = "",
    onClick,
    type = "button",
    children,
  } = props;
  const defaultClass =
    "w-full flex justify-center items-center text-white h-[48px] rounded p-5";
  return (
    <div>
      <button
        disabled={disabled}
        type={type}
        className={`${defaultClass} ${
          disabled ? "opacity-45" : ""
        } ${classname}`}
        onClick={() => onClick && onClick()}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
