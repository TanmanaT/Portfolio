import { createContext, useContext } from "react";

export const ThemeContext = createContext("strawberry");

export const useTheme = () => useContext(ThemeContext);
