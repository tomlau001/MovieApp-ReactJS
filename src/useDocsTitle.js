import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useDocsTitle = () => {
  const location = useLocation();
  const title = location.pathname.slice(1);

  useEffect(() => {
    document.title = `Movie App | ${title ? title : "Home"}`
  }, [title]);
};

export default useDocsTitle;
