import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeType, themes } from "./theme";

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  themeType: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(
    systemColorScheme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    // Kaydedilmiş tema tercihini yükle
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("userTheme");
        if (savedTheme) {
          setThemeType(savedTheme as ThemeType);
        } else {
          // İlk kez kullanılıyorsa sistem temasını kullan
          setThemeType(systemColorScheme === "dark" ? "dark" : "light");
        }
      } catch (error) {
        console.error("Tema yüklenirken hata oluştu:", error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = themeType === "light" ? "dark" : "light";
    try {
      await AsyncStorage.setItem("userTheme", newTheme);
      setThemeType(newTheme);
    } catch (error) {
      console.error("Tema kaydedilirken hata oluştu:", error);
    }
  };

  const value = {
    theme: themes[themeType],
    themeType,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
