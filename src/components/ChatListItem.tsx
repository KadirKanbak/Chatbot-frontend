import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Chat } from "../types/chat";
import { useTheme } from "../styles/ThemeContext";

type Props = {
  chat: Chat;
  onPress: (chat: Chat) => void;
};

export default function ChatListItem({ chat, onPress }: Props) {
  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderBottomColor: theme.colors.border,
    },
    avatar: {
      backgroundColor: `${theme.colors.primary}20`,
    },
    title: {
      color: theme.colors.text.primary,
    },
    timestamp: {
      color: theme.colors.text.secondary,
    },
    lastMessage: {
      color: theme.colors.text.secondary,
    },
    badge: {
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container, dynamicStyles.container]}
      onPress={() => onPress(chat)}
      activeOpacity={0.7}
    >
      <View style={[styles.avatar, dynamicStyles.avatar]}>
        <Ionicons
          name="chatbubble-outline"
          size={24}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, dynamicStyles.title]} numberOfLines={1}>
            {chat.title}
          </Text>
          <Text style={[styles.timestamp, dynamicStyles.timestamp]}>
            {chat.timestamp}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text
            style={[styles.lastMessage, dynamicStyles.lastMessage]}
            numberOfLines={1}
          >
            {chat.lastMessage}
          </Text>
          {chat.unreadCount ? (
            <View style={[styles.badge, dynamicStyles.badge]}>
              <Text style={styles.badgeText}>{chat.unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
