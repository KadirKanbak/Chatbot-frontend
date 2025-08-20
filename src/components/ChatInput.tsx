import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
};

export default function ChatInput({
  value,
  onChangeText,
  onSend,
  placeholder = "Mesajınızı yazın...",
}: Props) {
  const disabled = value.trim().length === 0;
  const quickReplies = ["ben", "tamam", "sen"];

  return (
    <View style={styles.container}>
      <View style={styles.quickReplies}>
        {quickReplies.map((reply) => (
          <TouchableOpacity
            key={reply}
            style={styles.quickReplyButton}
            onPress={() => onChangeText(reply)}
          >
            <Text style={styles.quickReplyText}>{reply}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputBar}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8E8E93"
          style={styles.input}
          returnKeyType="send"
          onSubmitEditing={() => !disabled && onSend()}
        />
        <TouchableOpacity
          style={[styles.sendBtn, disabled && { opacity: 0.4 }]}
          onPress={onSend}
          disabled={disabled}
        >
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F5FF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(173,198,255,0.5)",
    paddingBottom: Platform.OS === "ios" ? 8 : 4,
  },
  quickReplies: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  quickReplyButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#E8E9FF",
    borderRadius: 14,
  },
  quickReplyText: {
    color: "#2F54EB",
    fontSize: 13,
    fontWeight: "500",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    height: 38,
    backgroundColor: "#fff",
    borderRadius: 19,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(173,198,255,0.3)",
  },
  sendBtn: {
    marginLeft: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2F54EB",
  },
});
