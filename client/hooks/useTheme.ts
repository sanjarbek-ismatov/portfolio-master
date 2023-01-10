import { useState } from "react";
import { themes } from "types/theme";
export const useTheme: any = () => {
  const allThemes: themes[] = ["dark", "light"];
  const [localTheme, setLocalTheme] = useState<themes>(
    typeof window !== "undefined" ? localStorage.theme : "light"
  );
  if (!localTheme) {
    localStorage.setItem("theme", "light");
  }
  const changeTheme: (theme: themes) => void = (theme) => {
    setLocalTheme(theme);
    localStorage.setItem("theme", theme);
  };
  return [localTheme, changeTheme, allThemes];
};
