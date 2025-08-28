import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/styles/ThemeContext";
import { metrics, normalize } from "@/utils/metrics";

const ThemeFloatingToggle: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { theme, themeType, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={
        themeType === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      onPress={toggleTheme}
      activeOpacity={0.85}
      style={[
        styles.btn,
        {
          top: insets.top + 8,
          right: metrics.padding.large,
          backgroundColor: theme.colors.surface,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
          borderColor: theme.colors.primary + "33",
        },
      ]}
    >
      <MaterialIcons
        name={themeType === "dark" ? "light-mode" : "dark-mode"}
        size={normalize(18)}
        color={theme.colors.primary}
      />
      <Text style={[styles.text, { color: theme.colors.primary }]}>
        {" "}
        {themeType === "dark" ? "Light" : "Dark"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: metrics.padding.medium,
    paddingVertical: metrics.padding.small,
    borderRadius: 18,
    borderWidth: 1,
    zIndex: 100,
  },
  text: {
    fontSize: normalize(12),
    fontWeight: "600",
    ...Platform.select({ android: { includeFontPadding: false } }),
  },
});

export default ThemeFloatingToggle;
