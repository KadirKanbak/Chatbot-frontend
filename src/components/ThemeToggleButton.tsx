import React from "react";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../styles/ThemeContext";
import { metrics } from "../utils/metrics";

export const ThemeToggleButton: React.FC<{
  style?: any;
  iconColor?: string;
}> = ({ style, iconColor }) => {
  const { themeType, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.button,
        { backgroundColor: theme.colors.surface + "20" },
        style,
      ]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <MaterialIcons
        name={themeType === "light" ? "dark-mode" : "light-mode"}
        size={metrics.icons.medium}
        color={iconColor || theme.colors.text.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: metrics.padding.small,
    borderRadius: metrics.borderRadius.large,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
