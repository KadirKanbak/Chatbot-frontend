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
  StatusBar,
  Keyboard,
} from "react-native";
import { useTheme } from "@/styles/ThemeContext";
import { metrics, normalize } from "../utils/metrics";
import { MaterialIcons } from "@expo/vector-icons";

export type Message = { id: string; text: string; from: "user" | "bot" };

type Props = {
  onClose?: () => void;
  title?: string;
};

export default function ChatScreen({ onClose, title }: Props) {
  const { theme, themeType } = useTheme();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const showEvent =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const hideEvent =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    const showSub = Keyboard.addListener(showEvent, () => {
      // Klavye açılınca otomatik sona kaydır
      setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 60);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {});
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", text: "Merhaba, sana nasıl yardımcı olabilirim?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatRef = useRef<FlatList<Message>>(null);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      text: txt,
      from: "user",
    };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 50);
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "AI yanıtınız burada olacak...",
        from: "bot",
      };
      setMessages((p) => [...p, botMsg]);
      setIsTyping(false);
      setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 50);
    }, 1500);
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
    <View style={[s.root, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={themeType === "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView style={s.safe}>
        <View
          style={[
            s.header,
            { backgroundColor: colors.headerBg, borderColor: colors.border },
          ]}
        >
          <MaterialIcons
            name="chat"
            size={normalize(28)}
            color={theme.colors.text.primary}
            style={{ opacity: 0.9 }}
          />
          <Text style={[s.headerTitle, { color: theme.colors.text.primary }]}>
            {title || "FinPal"}
          </Text>
          {onClose && (
            <Pressable onPress={onClose} style={s.closeBtn} hitSlop={8}>
              <MaterialIcons
                name="close"
                size={normalize(24)}
                color={theme.colors.text.secondary}
              />
            </Pressable>
          )}
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
            contentContainerStyle={s.listContent}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <View
                style={[
                  s.bubble,
                  item.from === "user" ? s.userBubble : s.botBubble,
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
                    s.bubbleText,
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
            <View style={s.typingWrap}>
              <Text style={[s.typingText, { color: theme.colors.primary }]}>
                AI yazıyor...
              </Text>
            </View>
          )}
          <View
            style={[
              s.composerPanel,
              {
                backgroundColor:
                  themeType === "dark"
                    ? "rgba(44,46,71,0.94)"
                    : "rgba(255,255,255,0.92)",
                paddingBottom: insets.bottom + metrics.padding.small,
              },
            ]}
          >
            <View
              style={[
                s.textarea,
                {
                  borderColor: theme.colors.border,
                  backgroundColor:
                    themeType === "dark"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.03)",
                },
              ]}
            >
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Mesaj yaz..."
                placeholderTextColor={theme.colors.text.secondary}
                style={s.input}
                multiline
                maxLength={1000}
              />
              <Pressable
                style={[
                  s.sendBtn,
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
}

const s = StyleSheet.create({
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
    flex: 1,
  },
  closeBtn: {
    padding: metrics.padding.small,
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
    paddingHorizontal: metrics.padding.medium,
    paddingTop: metrics.padding.small,
    paddingBottom: metrics.padding.small,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: -4 },
      },
      android: {
        elevation: 16,
      },
    }),
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
