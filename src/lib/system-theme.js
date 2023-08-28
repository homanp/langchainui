import { useEffect, useState } from "react";

export const useSystemTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState();

  useEffect(() => {
    const handleChange = (event) => {
      setIsDarkMode(event.matches);
    };

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);

    darkModeQuery.addEventListener("change", handleChange);
    return () => {
      darkModeQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isDarkMode;
};
