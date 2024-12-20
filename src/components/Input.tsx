import React from "react";

type Props = {
  type: string;
  value?: string;
  label?: string;
  name: string;
  classname?: string;
  placeholder?: string;
  onChange?: (text?: any) => void;
  autoComplete?: string;
  error: string | undefined;
  inline?: boolean;
  disabled?: boolean;
};

const Input = (props: Props) => {
  const {
    type,
    placeholder = "Ketik disini",
    classname = "",
    onChange,
    name,
    label,
    autoComplete = "on",
    value = "",
    error = "",
    inline = false,
    disabled = false,
    ...rest
  } = props;
  const defaultClass = `text-xs w-full text-white bg-gray-300/[.06] active:outline-none focus:outline-none rounded-lg p-5 flex-1 ${
    inline ? "w-9/12 h-[36px] text-right" : "w-full h-[51px]"
  } ${disabled ? 'opacity-50' : ''}`;
  return (
    <div>
      <div
        className={
          inline
            ? "flex items-center justify-between gap-6"
            : "flex flex-col gap-2"
        }
      >
        {label && (
          <label className="mb-1 inline-block text-white/50 text-xs w-3/12">
            {label}
          </label>
        )}
        <input
          autoComplete={autoComplete}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`${defaultClass} ${classname}`}
          value={value || ""}
          onChange={(e) => onChange && onChange(e.target.value)}
          {...rest}
        />
      </div>
      {error && (
        <p
          className={`text-sm text-red-600 mt-1 ${
            inline ? "text-right" : "text-left"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
