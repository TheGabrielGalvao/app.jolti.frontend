import { BaseComponentProps } from "../atoms/types";
import { Header, SideMenu } from "../molecules";

export interface DefaultLayoutProps extends BaseComponentProps {}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="overflow-y-hidden max-h-screen">
      <div className="flex bg-gray-100">
        <SideMenu />
        <div className="flex flex-col w-full">
          <Header />
          <div className="flex w-full h-full p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};
