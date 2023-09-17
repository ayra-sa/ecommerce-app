import { FieldProps } from "formik";
import React, { FC } from "react";

interface InputFieldProps extends FieldProps {}

const InputField: FC<InputFieldProps> = ({
  field,
  form: { errors, touched },
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        {...field}
        {...props}
        className={`border w-full py-2 px-3 rounded-md focus:outline-none ${
          errors[field.name] && touched[field.name] ? "border-red-500" : "border-neutral-300"
        }`}
      />
      {errors[field.name] && touched[field.name] && (
        <p className="text-red-500 text-xs mt-1 text-left">{errors[field.name] as string}</p>
      )}
    </div>
  );
};

export default InputField;
