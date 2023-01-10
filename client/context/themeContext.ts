import { createContext } from "react";
import { themes } from "types/theme";
type initialStateType = {
  theme: themes;
  changeTheme: (theme: themes) => void;
  allThemes: themes[];
};

export const ThemeContext = createContext({} as initialStateType);
