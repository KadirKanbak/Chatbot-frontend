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
  // Uygulama genelinde tekrar eden "geekblue" tabanlı auth paleti
  brand: {
    darkBase: string; // #030852
    mid: string; // #10239e
    border: string; // #2f54eb
    paleBorder: string; // #adc6ff
    bg: string; // #f0f5ff
    inputBorder: string; // #d6e4ff
    accent: string; // #85a5ff (kayıt/login buton aktif arka planı)
    errorText: string; // hata yazısı (light: #ff3b30, dark: #ff7875)
  };
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

// Merkezî renk paleti (kullanıcının sağladığı geek blue skalası)
export const brandPalette = {
  PALE_BORDER: "#ADC6FF",
  INPUT_BORDER: "#D6E4FF",
  BG_LIGHT: "#F0F5FF",
  ACCENT_LIGHT: "#85A5FF",
  BORDER: "#2F54EB",
  MID_2: "#1D39C4",
  MID: "#10239E",
  DEEP: "#061178",
  DARK_BASE: "#030852",
};

export const themes: Record<ThemeType, Theme> = {
  light: {
    colors: {
      // Light temada palete daha sıkı bağlanıyoruz
      primary: brandPalette.MID, // #10239E
      secondary: brandPalette.BORDER, // #2F54EB
      accent: brandPalette.ACCENT_LIGHT, // #85A5FF (ikincil vurgu)
      background: brandPalette.BG_LIGHT, // #F0F5FF
      surface: "#FFFFFF",
      text: {
        primary: brandPalette.DARK_BASE, // koyu lacivert taban metin
        secondary: brandPalette.MID_2, // orta ton açıklama
        inverse: "#FFFFFF",
      },
      bubble: {
        user: brandPalette.MID, // kullanıcı balonu
        bot: brandPalette.BG_LIGHT,
        userText: "#FFFFFF",
        botText: brandPalette.DARK_BASE,
      },
      border: brandPalette.INPUT_BORDER,
      success: "#34C759",
      error: "#FF3B30",
      brand: {
        darkBase: brandPalette.DARK_BASE,
        mid: brandPalette.MID,
        border: brandPalette.BORDER,
        paleBorder: brandPalette.PALE_BORDER,
        bg: brandPalette.BG_LIGHT,
        inputBorder: brandPalette.INPUT_BORDER,
        accent: brandPalette.MID,
        errorText: "#ff3b30",
      },
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
      primary: brandPalette.BG_LIGHT, // açık mavi vurgu
      secondary: brandPalette.BORDER,
      accent: brandPalette.PALE_BORDER,
      background: brandPalette.DARK_BASE, // daha koyu arka plan
      surface: brandPalette.MID, // kart yüzeyi
      text: {
        primary: "#FFFFFF",
        secondary: brandPalette.PALE_BORDER,
        inverse: brandPalette.DARK_BASE,
      },
      bubble: {
        user: brandPalette.ACCENT_LIGHT,
        bot: brandPalette.MID,
        userText: brandPalette.DARK_BASE,
        botText: "#FFFFFF",
      },
      border: brandPalette.BORDER,
      success: "#73D13D",
      error: "#FF7875",
      brand: {
        darkBase: brandPalette.DARK_BASE,
        mid: brandPalette.MID,
        border: brandPalette.BORDER,
        paleBorder: brandPalette.PALE_BORDER,
        bg: brandPalette.DARK_BASE,
        inputBorder: brandPalette.INPUT_BORDER,
        accent: brandPalette.ACCENT_LIGHT,
        errorText: "#ff7875",
      },
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
