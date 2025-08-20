import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title?: string;
  onClose?: () => void;
};

export default function ChatHeader({
  title = "Mobil Chatbot",
  onClose,
}: Props) {
  return (
    <View style={styles.header}>
      <Ionicons
        name="chatbubbles"
        size={20}
        color="#2F54EB"
        style={{ marginRight: 8 }}
      />
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        onPress={onClose}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="close" size={22} color="#2F54EB" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 48,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5EA",
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 16, fontWeight: "600", color: "#2F54EB" },
});
