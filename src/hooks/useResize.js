import { useEffect, useState } from "react";

export const useResize = () => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 900 ? true : false
  );

  const handleResize = () => {
    window.innerWidth < 900 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return { isMobile };
};
