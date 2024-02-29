import React, { ReactNode } from "react";
import { useFormContext, FieldError } from "react-hook-form";

type FormFieldProps = {
  name: string;
  label: string;
  children: ReactNode;
};

export function FormField({ name, label, children }: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement, {
            ...children.props,
            id: name,
            name: name,
            register: register,
            error: error,
          })
        : children}
      {error && <span>{error.message}</span>}
    </div>
  );
}
