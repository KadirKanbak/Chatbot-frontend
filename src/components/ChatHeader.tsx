import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/styles/ThemeContext";
import { metrics } from "../utils/metrics";

type Props = {
  title?: string;
  onClose?: () => void;
};

export default function ChatHeader({
  title = "FinPal Asistan",
  onClose,
}: Props) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.headerContent}>
        <MaterialIcons
          name="chat"
          size={metrics.icons.small}
          color={theme.colors.primary}
          style={styles.headerIcon}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
          {title}
        </Text>
      </View>
      {onClose && (
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{
            top: metrics.padding.small,
            bottom: metrics.padding.small,
            left: metrics.padding.small,
            right: metrics.padding.small,
          }}
          style={styles.closeButton}
        >
          <MaterialIcons
            name="close"
            size={metrics.icons.small}
            color={theme.colors.text.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: metrics.padding.medium,
    height: metrics.padding.xlarge * 1.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: metrics.padding.small, // floating toggle ile dikey mesafe
    zIndex: 1,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: metrics.padding.small,
  },
  headerTitle: {
    fontSize: metrics.fontSize.medium,
    fontWeight: "600",
  },
  closeButton: {
    padding: metrics.padding.small,
    marginLeft: metrics.padding.medium,
  },
});
