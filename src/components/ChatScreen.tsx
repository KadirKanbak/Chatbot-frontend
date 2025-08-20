import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  FlatList,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

export type Message = { id: string; text: string; from: "user" | "bot" };

type Props = {
  onClose?: () => void;
  title?: string;
};

export default function ChatScreen({ onClose, title }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      text: "Merhaba! Size nasıl yardımcı olabilirim?",
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const newUserMsg: Message = { id: String(Date.now()), text, from: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");

    // Mesaj gönderildikten sonra en alta scroll
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const reply: Message = {
        id: String(Date.now() + 1),
        text: "AI yanıtınız burada olacak...",
        from: "bot",
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);

      // Bot yanıtı geldiğinde en alta scroll
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  return (
    <LinearGradient
      colors={["#F5F8FF", "#E8EFFF", "#D6E4FF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        enabled
      >
        <View style={styles.card}>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ChatHeader onClose={onClose} title={title} />

            <View style={styles.messages}>
              <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ChatBubble text={item.text} from={item.from} />
                )}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                inverted={false}
                automaticallyAdjustKeyboardInsets={true}
                initialNumToRender={15}
                maxToRenderPerBatch={10}
                windowSize={10}
                maintainVisibleContentPosition={{
                  minIndexForVisible: 0,
                  autoscrollToTopThreshold: 10,
                }}
                onContentSizeChange={() => {
                  flatListRef.current?.scrollToEnd({ animated: true });
                }}
              />
            </View>

            {isTyping && (
              <View style={styles.typingContainer}>
                <Text style={styles.typingText}>AI yazıyor...</Text>
              </View>
            )}

            <ChatInput
              value={input}
              onChangeText={setInput}
              onSend={handleSend}
            />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 12 : 8,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 6 },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
  },
  messages: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "#F5F8FF",
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: "flex-end",
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(92,108,255,0.1)",
  },
  typingText: {
    fontSize: 13,
    color: "#5C6CFF",
    fontStyle: "italic",
  },
});
