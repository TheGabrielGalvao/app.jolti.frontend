import { Slot } from "@radix-ui/react-slot";
import {
  ButtonHTMLAttributes,
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
} from "react";

export interface TextInputRootElementProps {
  children: ReactNode;
}

const TextInputRoot = ({ children }: TextInputRootElementProps) => (
  <div className="flex items-center gap-3 py-4 px-3 h-12 rounded border border-blue-100 w-full focus-within:ring-2 ring-cyan-300">
    {children}
  </div>
);

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  register?: any;
}

const TextInputInput = ({ ...props }: TextInputInputProps) => {
  return (
    <input
      className="bg-transparent flex-1 outline-none text-gray-800 text-xs placeholder:text-gray-300"
      {...props}
      {...props.register}
    />
  );
};

export interface TextInputIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const TextInputIcon = ({ children, onClick }: TextInputIconProps) => {
  return (
    <Slot className="w-6 h-6 text-gray-500" onClick={onClick}>
      {children}
    </Slot>
  );
};

export interface TextInputMessageProps {
  message?: string;
  variant?: "default";
}

const TextInputMessage = ({ message, variant }: TextInputMessageProps) => {
  return <Slot className="w-6 h-6 text-gray-500">{message}</Slot>;
};

TextInputIcon.displayName = "TextInput.Icon";
TextInputInput.displayName = "TextInput.Input";
TextInputRoot.displayName = "TextInput.Root";
TextInputMessage.displayName = "TextInput.Message";

export const TextInputElement = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
  Message: TextInputMessage,
};
