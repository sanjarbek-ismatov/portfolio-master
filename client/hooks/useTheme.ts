import { useEffect, useState } from "react";
import { themes } from "types/theme";
export const useTheme: any = () => {
  const allThemes: themes[] = ["dark", "light", "contrast", "lightblue"];
  const [localTheme, setLocalTheme] = useState<themes>("light");
  useEffect(() => {
    if (!localStorage.theme) {
      localStorage.setItem("theme", "light");
    } else {
      setLocalTheme(localStorage.theme);
    }
  }, [localTheme]);

  const changeTheme: (theme: themes) => void = (theme) => {
    setLocalTheme(theme);
    localStorage.setItem("theme", theme);
  };
  return [localTheme, changeTheme, allThemes];
};
