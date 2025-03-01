import { createContext, ReactNode, useState } from "react";

type ThemeContextType = {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  };


const ThemeContext = createContext<ThemeContextType>({
    loggedIn: false,
    setLoggedIn: () => {},
});

type ThemeProviderProps = {
    children: ReactNode;
};

function ThemeProvider({children}: ThemeProviderProps) {
    const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ThemeContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };