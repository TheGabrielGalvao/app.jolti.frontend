import { Funnel, Plus } from "phosphor-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ButtonElement,
  HeadingElement,
  TextElement,
} from "../../../core/components/atoms";
import { useGlobal } from "../../context/GlobalContext";
import { useAuth } from "../../context/AuthContext";

interface CrudFeatureProps {
  title?: string;
  legend?: string;
  defaultRoute?: string;
}

export const CrudFeature = ({ title, legend }: CrudFeatureProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const padrao = /\/list$/;
  const pathList = location.pathname.split("/");

  useEffect(() => {
    if (pathList.length < 3) {
      navigate("list");
    }
  }, [location.pathname]);

  return <Outlet />;
};
