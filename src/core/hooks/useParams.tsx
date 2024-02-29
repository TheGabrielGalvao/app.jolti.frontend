import { useLocation } from "react-router";

const useParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams);

  return params;
};

export default useParams;
