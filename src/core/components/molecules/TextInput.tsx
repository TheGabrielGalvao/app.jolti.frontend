import clsx from "clsx";
import { ChangeEventHandler, HtmlHTMLAttributes, ReactNode } from "react";
import { TextElement, TextInputElement } from "../atoms";

interface TextInputProps extends HtmlHTMLAttributes<HTMLInputElement> {
  type?: string;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  register?: any;
  helperText?: string;
  [key: string]: any;
}

export const TextInput = ({
  type,
  id,
  name,
  label,
  placeholder,
  icon,
  register,
  helperText,
  className,
}: TextInputProps) => {
  return (
    <label
      htmlFor={name}
      className={clsx("flex flex-col gap-0.5 h-24", className)}
    >
      <TextElement className="" size="md">
        {label}
      </TextElement>
      <TextInputElement.Root>
        {icon && <TextInputElement.Icon>{icon}</TextInputElement.Icon>}
        <TextInputElement.Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          register={register}
        />
      </TextInputElement.Root>
      <TextElement className="text-red-400 px-2" size="sm">
        {helperText}
      </TextElement>
    </label>
  );
};
