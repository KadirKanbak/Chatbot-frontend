import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { normalize } from "@/utils/metrics";
import { useTheme } from "@/styles/ThemeContext";

// NOT: katman-1.svg ve katman-3.svg şu an repo içinde bulunamadı.
// Orijinal SVG'ler eklendiğinde aşağıdaki yorumlu import yollarını düzenleyip
// placeholder yapıyı kaldırabilirsiniz.
// import Katman1 from '../../assets/katman-1.svg';
// import Katman3 from '../../assets/katman-3.svg';

interface LogoV31Props {
  size?: number;
}

const LogoV31: React.FC<LogoV31Props> = ({ size = normalize(104) }) => {
  const { theme, themeType } = useTheme();
  const outer = size;
  const accent = outer * 0.32;

  // Tema bazlı renk seçimi
  const baseBg =
    themeType === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const accentBg = theme.colors.primary; // küçük rozet arka planı
  const boltColor = theme.colors.text.inverse;

  return (
    <View
      style={[
        styles.wrap,
        {
          width: outer,
          height: outer,
          borderRadius: outer * 0.3,
          backgroundColor: baseBg,
        },
      ]}
    >
      <Image
        source={require("../../assets/icon.png")}
        resizeMode="contain"
        style={{ width: outer * 0.62, height: outer * 0.62, opacity: 0.95 }}
      />
      <View
        style={[
          styles.accent,
          {
            width: accent,
            height: accent,
            borderRadius: accent / 2,
            right: -accent * 0.18,
            bottom: -accent * 0.18,
            backgroundColor: accentBg,
          },
        ]}
      >
        <MaterialIcons name="bolt" size={accent * 0.55} color={boltColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  accent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LogoV31;
