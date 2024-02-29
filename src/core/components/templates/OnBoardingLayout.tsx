import { BaseComponentProps } from "../atoms/types";
import bgBlue from "../../../assets/img/bg-blue.jpg";
import { HeadingElement, TextElement } from "../atoms";
import clsx from "clsx";

export interface LoginPageProps extends BaseComponentProps {
  headerText?: string;
  secondaryText?: string;
}

export const OnBoardingLayout = ({
  children,
  headerText,
  secondaryText,
  className,
}: LoginPageProps) => {
  return (
    <div
      className="w-screen p-6 h-screen flex items-center justify-center text-gray-100 flex-col"
      style={{ backgroundImage: `url(${bgBlue})`, backgroundSize: "cover" }}
    >
      <header className={clsx("flex flex-col items-center", className)}>
        <HeadingElement size="lg" className="mt-4">
          {headerText}
        </HeadingElement>

        <TextElement size="lg" className="mt-1">
          {secondaryText}
        </TextElement>
      </header>
      <div className="w-auto bg-card rounded-lg border border-blue-100 p-11 mt-10">
        {children}
      </div>
      <footer className="flex flex-col items-center gap-4 mt-8">
        <TextElement size="sm">
          <a href="" className="text-white underline hover:text-gray-200 ">
            Esqueceu sua Senha?
          </a>
        </TextElement>

        <TextElement size="sm">
          <a href="" className="text-white underline hover:text-gray-200 ">
            Não possui conta? Crie uma agora
          </a>
        </TextElement>
      </footer>
    </div>
  );
};
