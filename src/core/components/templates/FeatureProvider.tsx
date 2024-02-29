import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BreadCrumbs, HeadingElement } from "../atoms";
import { FeatureMenu } from "../molecules/FeatureMenu";

interface FeatureProviderProps {
  title?: string;
  rootPath: string;
  initialPath?: string;
}

export const FeatureProvider = ({
  rootPath,
  initialPath,
}: FeatureProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == rootPath && initialPath) {
      navigate(initialPath);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col w-full px-4 gap-3 overflow-y-hidden">
      <div className="flex w-full justify-between pb-2 items-center overflow-y-hidden border-b border-b-gray-300">
        <BreadCrumbs route={rootPath} />
        <FeatureMenu route={rootPath} />
      </div>
      <div className="flex flex-col h-full overflow-y-hidden">
        <Outlet />
      </div>
    </div>
  );
};
