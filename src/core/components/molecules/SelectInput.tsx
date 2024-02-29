import clsx from "clsx";
import {
  ChangeEvent,
  ChangeEventHandler,
  HtmlHTMLAttributes,
  ReactNode,
} from "react";
import { SelectInputElement, TextElement } from "../atoms";
import { OptionItem } from "../../types/Option";

interface SelectInputProps extends HtmlHTMLAttributes<HTMLSelectElement> {
  type?: string;
  id?: string;
  name?: string;
  label?: string;
  options?: OptionItem[];
  placeholder?: string;
  icon?: ReactNode;
  handleChange?: ChangeEventHandler<HTMLSelectElement>;
  register?: any;
  helperText?: string;
  [key: string]: any;
}

export const SelectInput = ({
  id,
  name,
  label,
  options,
  placeholder,
  icon,
  register,
  helperText,
  className,
  ...props
}: SelectInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <label
      htmlFor={name}
      className={clsx("flex flex-col gap-0.5 h-24", className)}
    >
      <TextElement className="" size="md">
        {label}
      </TextElement>
      <SelectInputElement.Root>
        {icon && <SelectInputElement.Icon>{icon}</SelectInputElement.Icon>}
        <SelectInputElement.Input
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          options={options}
          value={props.value}
          register={register}
          {...props}
        />
      </SelectInputElement.Root>
      <TextElement className="text-red-400 px-2" size="sm">
        {helperText}
      </TextElement>
    </label>
  );
};
