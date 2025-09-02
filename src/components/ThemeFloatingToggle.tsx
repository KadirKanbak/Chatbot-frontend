import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/styles/ThemeContext";
import { metrics, normalize } from "@/utils/metrics";

const ThemeFloatingToggle: React.FC<{ currentRoute?: string }> = ({
  currentRoute,
}) => {
  const insets = useSafeAreaInsets();
  const { theme, themeType, toggleTheme } = useTheme();

  if (currentRoute === "ChatDetails") {
    return null; // Chat ekranında başlığa entegre edildi.
  }
  const compact = false;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={
        themeType === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      onPress={toggleTheme}
      activeOpacity={0.85}
      style={[
        styles.base,
        styles.regular,
        { top: insets.top + 8, right: metrics.padding.large },
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.primary + "33",
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        },
      ]}
    >
      <MaterialIcons
        name={themeType === "dark" ? "light-mode" : "dark-mode"}
        size={normalize(18)}
        color={theme.colors.primary}
      />
      <Text style={[styles.text, { color: theme.colors.primary }]}>
        {themeType === "dark" ? "Light" : "Dark"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    position: "absolute",
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  regular: {
    paddingHorizontal: metrics.padding.medium,
    paddingVertical: metrics.padding.small,
    borderRadius: 18,
  },
  compact: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    justifyContent: "center",
  },
  text: {
    fontSize: normalize(12),
    fontWeight: "600",
    ...Platform.select({ android: { includeFontPadding: false } }),
  },
});

export default ThemeFloatingToggle;
