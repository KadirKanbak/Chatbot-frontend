import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useTheme } from "@/styles/ThemeContext";
import { metrics } from "../utils/metrics";

type Props = {
  text: string;
  from?: "user" | "bot";
};

export default function ChatBubble({ text, from = "bot" }: Props) {
  const { theme } = useTheme();
  const isUser = from === "user";

  return (
    <View
      style={[
        styles.bubble,
        {
          alignSelf: isUser ? "flex-end" : "flex-start",
          backgroundColor: isUser
            ? theme.colors.bubble.user
            : theme.colors.bubble.bot,
          borderBottomRightRadius: isUser
            ? metrics.borderRadius.small
            : metrics.borderRadius.large,
          borderBottomLeftRadius: isUser
            ? metrics.borderRadius.large
            : metrics.borderRadius.small,
          marginLeft: isUser ? metrics.padding.xlarge : metrics.padding.small,
          marginRight: isUser ? metrics.padding.small : metrics.padding.xlarge,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isUser
              ? theme.colors.bubble.userText
              : theme.colors.bubble.botText,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "82%",
    paddingVertical: metrics.padding.small + 2,
    paddingHorizontal: metrics.padding.medium - 2,
    borderRadius: metrics.borderRadius.large,
    marginBottom: metrics.padding.small / 2,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: metrics.padding.small / 2,
        shadowOffset: { width: 0, height: metrics.padding.small / 4 },
      },
      android: { elevation: 2 },
    }),
  },
  text: {
    fontSize: metrics.fontSize.medium - 1,
    lineHeight: metrics.fontSize.medium * 1.4,
    letterSpacing: 0.1,
  },
});
