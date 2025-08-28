import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useTheme } from "@/styles/ThemeContext";
import { metrics, normalize } from "@/utils/metrics";
import { MaterialIcons } from "@expo/vector-icons";

interface BotMessage {
  id: string;
  text: string;
  from: "user" | "bot";
}

const ChatBotScreen: React.FC = () => {
  const { theme, themeType } = useTheme();
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const hideEvent =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    const showSub = Keyboard.addListener(showEvent, () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  const [messages, setMessages] = useState<BotMessage[]>([
    { id: "m1", text: "Merhaba, sana nasıl yardımcı olabilirim?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatRef = useRef<FlatList<BotMessage>>(null);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    const userMsg: BotMessage = {
      id: Date.now().toString(),
      text: txt,
      from: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 50);
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: BotMessage = {
        id: (Date.now() + 1).toString(),
        text: "Örnek AI cevabı...",
        from: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 50);
    }, 1200);
  };

  const colors = {
    headerBg:
      themeType === "dark" ? "rgba(3,8,82,0.5)" : "rgba(133,165,255,0.5)",
    panelBg:
      themeType === "dark" ? "rgba(29,57,196,0.5)" : "rgba(133,165,255,0.5)",
    border: themeType === "dark" ? "#030852" : "#f0f5ff",
    bubbleUser: theme.colors.primary,
    bubbleBot: theme.colors.surface,
    bubbleUserText: theme.colors.text.inverse,
    bubbleBotText: theme.colors.text.primary,
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={styles.safe}>
        <View
          style={[
            styles.header,
            { backgroundColor: colors.headerBg, borderColor: colors.border },
          ]}
        >
          <MaterialIcons
            name="chat"
            size={normalize(28)}
            color={theme.colors.text.primary}
            style={{ opacity: 0.9 }}
          />
          <Text
            style={[styles.headerTitle, { color: theme.colors.text.primary }]}
          >
            FinPal
          </Text>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0}
        >
          <FlatList
            ref={flatRef}
            data={messages}
            keyExtractor={(m) => m.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.bubble,
                  item.from === "user" ? styles.userBubble : styles.botBubble,
                  item.from === "user"
                    ? { backgroundColor: colors.bubbleUser }
                    : {
                        backgroundColor: colors.bubbleBot,
                        borderColor: theme.colors.border,
                        borderWidth: 1,
                      },
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    item.from === "user"
                      ? { color: colors.bubbleUserText }
                      : { color: colors.bubbleBotText },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            )}
          />
          {isTyping && (
            <View style={styles.typingWrap}>
              <Text
                style={[styles.typingText, { color: theme.colors.primary }]}
              >
                AI yazıyor...
              </Text>
            </View>
          )}
          <View
            style={[
              styles.composerPanel,
              {
                borderColor: colors.border,
                backgroundColor:
                  themeType === "dark"
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(0,0,0,0.02)",
                paddingBottom:
                  (keyboardVisible ? 0 : insets.bottom) + metrics.padding.small,
              },
            ]}
          >
            <View
              style={[
                styles.textarea,
                {
                  borderColor: theme.colors.border,
                  backgroundColor:
                    themeType === "dark"
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(0,0,0,0.04)",
                },
              ]}
            >
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Mesaj yaz..."
                placeholderTextColor={theme.colors.text.secondary}
                style={styles.input}
                multiline
                maxLength={1000}
              />
              <Pressable
                style={[
                  styles.sendBtn,
                  {
                    backgroundColor: input.trim()
                      ? theme.colors.primary
                      : theme.colors.border,
                    opacity: input.trim() ? 1 : 0.6,
                  },
                ]}
                onPress={send}
                disabled={!input.trim()}
                hitSlop={6}
              >
                <MaterialIcons
                  name="send"
                  size={normalize(18)}
                  color={
                    input.trim()
                      ? theme.colors.text.inverse
                      : theme.colors.text.secondary
                  }
                  style={{ marginLeft: 1 }}
                />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: metrics.padding.large,
    height: normalize(72),
    borderBottomWidth: 4,
  },
  headerTitle: {
    fontSize: normalize(28),
    fontWeight: "600",
    marginLeft: metrics.padding.small,
  },
  listContent: { padding: metrics.padding.medium, gap: metrics.padding.small },
  bubble: {
    maxWidth: "80%",
    paddingVertical: metrics.padding.small,
    paddingHorizontal: metrics.padding.medium,
    borderRadius: 20,
  },
  userBubble: { alignSelf: "flex-end", borderTopRightRadius: 4 },
  botBubble: { alignSelf: "flex-start", borderTopLeftRadius: 4 },
  bubbleText: { fontSize: normalize(16), lineHeight: normalize(20) },
  typingWrap: {
    paddingHorizontal: metrics.padding.medium,
    paddingBottom: metrics.padding.small,
  },
  typingText: { fontSize: normalize(14), fontStyle: "italic" },
  composerPanel: {
    borderTopWidth: 1,
    paddingHorizontal: metrics.padding.medium,
    paddingVertical: metrics.padding.small,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: metrics.padding.medium,
    paddingVertical: metrics.padding.small,
    flexDirection: "row",
    alignItems: "center",
    minHeight: normalize(44),
    maxHeight: normalize(120),
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: normalize(15),
    lineHeight: normalize(20),
    paddingVertical: 0,
    maxHeight: normalize(120),
  },
  sendBtn: {
    marginLeft: metrics.padding.small,
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatBotScreen;
