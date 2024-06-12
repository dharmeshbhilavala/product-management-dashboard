// Input 
import React from "react";

export const Input = ({
  name,
  label,
  value,
  onChange,
  formik,
  isRequired,
  className,
  placeholder,
  disabled,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        <span className={isRequired ? "required" : ""}>{label}</span>
      </label>
      <input
        className={`appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow ${className}`}
        {...rest}
        onBlur={formik?.handleBlur}
        id={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
      {formik?.errors?.[name] && formik?.touched?.[name] && (
        <span className="mt-1 text-sm text-red-700">{formik?.errors?.[name]}</span>
      )}
    </div>
  );
};
