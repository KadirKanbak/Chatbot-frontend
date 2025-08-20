import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

type Props = {
  text: string;
  from?: "user" | "bot";
};

export default function ChatBubble({ text, from = "bot" }: Props) {
  const isUser = from === "user";
  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.botBubble,
        { alignSelf: isUser ? "flex-end" : "flex-start" },
      ]}
    >
      <Text style={[styles.text, { color: isUser ? "#fff" : "#1C1C1E" }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "82%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 4,
    marginBottom: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  userBubble: {
    backgroundColor: "#2F54EB",
    borderBottomRightRadius: 8,
    marginLeft: 40,
  },
  botBubble: {
    backgroundColor: "#F5F8FF",
    borderBottomLeftRadius: 8,
    marginRight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.1,
  },
});
