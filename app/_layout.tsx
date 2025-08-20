import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { createContext, useMemo, useState } from "react";
import { lightColors, darkColors } from "./theme";

export const ThemeContext = createContext({
  theme: "light" as "light" | "dark",
  toggleTheme: () => {},
  colors: lightColors
});

export default function RootLayout() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const colors = theme === "light" ? lightColors : darkColors;

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme(t => (t === "light" ? "dark" : "light")),
      colors
    }),
    [theme, colors]
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <Stack
        screenOptions={{
          headerTintColor: lightColors.primary,
          headerStyle: { backgroundColor: colors.bg },
          contentStyle: { backgroundColor: colors.bg }
        }}
      />
    </ThemeContext.Provider>
  );
}
