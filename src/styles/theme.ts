export type ThemeType = "light" | "dark";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    inverse: string;
  };
  bubble: {
    user: string;
    bot: string;
    userText: string;
    botText: string;
  };
  border: string;
  success: string;
  error: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  shadows: {
    sm: any;
    md: any;
  };
}

export const themes: Record<ThemeType, Theme> = {
  light: {
    colors: {
      primary: "#2B547E",
      secondary: "#4682B4",
      accent: "#5F9EA0",
      background: "#F0F8FF",
      surface: "#FFFFFF",
      text: {
        primary: "#1C1C1E",
        secondary: "#666666",
        inverse: "#FFFFFF",
      },
      bubble: {
        user: "#2B547E",
        bot: "#F0F8FF",
        userText: "#FFFFFF",
        botText: "#1C1C1E",
      },
      border: "#E5E5EA",
      success: "#34C759",
      error: "#FF3B30",
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      full: 9999,
    },
    shadows: {
      sm: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      md: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
      },
    },
  },
  dark: {
    colors: {
      primary: "#85A5FF",
      secondary: "#2F54EB",
      accent: "#ADC6FF",
      background: "#1F2140",
      surface: "#2C2E47",
      text: {
        primary: "#FFFFFF",
        secondary: "#ADC6FF",
        inverse: "#1F2140",
      },
      bubble: {
        user: "#85A5FF",
        bot: "#2C2E47",
        userText: "#1F2140",
        botText: "#FFFFFF",
      },
      border: "#3A3D66",
      success: "#73D13D",
      error: "#FF7875",
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      full: 9999,
    },
    shadows: {
      sm: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
      },
      md: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
      },
    },
  },
};
