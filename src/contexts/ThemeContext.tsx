import { createTheme } from "@mantine/core"
import { createContext, ReactNode, useContext } from "react"
import { useLocalStorage } from "usehooks-ts"

export const ThemeContext = createContext<{
  theme: {}
  themeColor: string
  setThemeColor: React.Dispatch<React.SetStateAction<string>>
} | null>(null)

export const ThemeProvider = (props: { children: ReactNode }) => {
  const [themeColor, setThemeColor] = useLocalStorage("theme", "indigo")

  const theme = createTheme({
    fontFamily: "Poppins, sans-serif",
    primaryColor: themeColor,
  })

  return <ThemeContext.Provider value={{ theme, themeColor, setThemeColor }}>{props.children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)

  if (ctx === null) {
    throw new Error("ThemeContext should be used within the ThemeProvider")
  }

  return ctx
}
