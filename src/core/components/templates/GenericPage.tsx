import { HeadingElement } from "../atoms";
import Calendar from "../molecules/Calendar";
import Calendar2 from "../molecules/Calendar2";

export interface GenericPageProps {
  text?: string;
}

export const GenericPage = ({ text }: GenericPageProps) => {
  return (
    <div className="flex flex-col p-16 items-center justify-center w-full">
      <HeadingElement>{text}</HeadingElement>
    </div>
  );
};
