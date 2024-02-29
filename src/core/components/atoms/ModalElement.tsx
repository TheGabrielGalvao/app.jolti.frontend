import clsx from "clsx";
import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { ButtonElement } from "./ButtonElement";
import { X } from "phosphor-react";

export interface ModalElementProps {
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

export interface ModalElementRef {
  show(): void;
  hide(): void;
}

const ModalElement: React.ForwardRefRenderFunction<
  ModalElementRef,
  ModalElementProps
> = ({ title, children, footer }, ref) => {
  const [showModal, setShowModal] = useState(false);

  const show = () => {
    setShowModal(true);
  };

  const hide = () => {
    setShowModal(false);
  };

  useImperativeHandle(ref, (): ModalElementRef => {
    return {
      show,
      hide,
    };
  });

  return (
    <div
      className={clsx(
        {
          hidden: showModal === false,
          flex: showModal === true,
        },
        "justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-40 focus:outline-none"
      )}
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-card outline-none focus:outline-none">
          <header className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=semibold">{title}</h3>
            <X
              className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full cursor-pointer"
              onClick={() => setShowModal(false)}
            />
          </header>
          <div className="relative p-6 flex-auto">{children}</div>
          <footer className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            {footer}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ModalElement);
