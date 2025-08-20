import React, { useRef, useState, useContext } from "react";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { ThemeContext } from "../_layout";

type Msg = { id: string; text: string; isMe: boolean };
const QUICK = ["ben", "tamam", "sen"];

export default function Chat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme, toggleTheme, colors: C } = useContext(ThemeContext);

  const [messages, setMessages] = useState<Msg[]>([
    { id: "1", text: "Merhaba! Size nasıl yardımcı olabilirim?", isMe: false }
  ]);
  const [text, setText] = useState("");
  const listRef = useRef<FlatList<Msg>>(null);

  const send = (preset?: string) => {
    const value = (preset ?? text).trim();
    if (!value) return;
    setText("");
    setMessages(p => [...p, { id: Date.now().toString(), text: value, isMe: true }]);
    setTimeout(() => {
      setMessages(p => [...p, { id: (Date.now() + 1).toString(), text: "AI yanıtınız burada olacak...", isMe: false }]);
      listRef.current?.scrollToEnd({ animated: true });
    }, 500);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.bg }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Stack.Screen
        options={{
          title: id === "new" ? "Yeni Sohbet" : `Sohbet #${id}`,
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity style={{ backgroundColor: C.primary, padding: 8, borderRadius: 8 }} onPress={toggleTheme}>
                <Text style={{ color: "#fff" }}>{theme === "light" ? "🌙" : "☀️"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: C.primary, padding: 8, borderRadius: 8 }} onPress={() => router.replace("/home")}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>←</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={[s.msgWrap, item.isMe ? s.right : s.left]}>
            <View style={[s.bubble, { backgroundColor: item.isMe ? C.bubbleRight : C.bubbleLeft }]}>
              <Text style={{ fontSize: 15, color: item.isMe ? "#fff" : C.text }}>{item.text}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={s.quickRow}>
        {QUICK.map(q => (
          <TouchableOpacity key={q} style={[s.chip, { backgroundColor: C.bubbleLeft }]} onPress={() => send(q)}>
            <Text style={{ color: C.primary, fontWeight: "700" }}>{q}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[s.inputRow, { borderColor: C.border, backgroundColor: C.white }]}>
        <TextInput
          style={[s.input, { backgroundColor: theme === "light" ? "#F3F4F6" : "#374151", color: C.text }]}
          placeholder="Mesajınızı yazın..."
          placeholderTextColor={C.sub}
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => send()}
        />
        <TouchableOpacity style={[s.send, { backgroundColor: C.primary }]} onPress={() => send()}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  msgWrap: { width: "100%", marginVertical: 4 },
  left: { alignItems: "flex-start" },
  right: { alignItems: "flex-end" },
  bubble: { maxWidth: "80%", paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14 },
  quickRow: { flexDirection: "row", gap: 8, paddingHorizontal: 10, paddingBottom: 6 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14 },
  inputRow: { flexDirection: "row", alignItems: "center", gap: 8, padding: 10, borderTopWidth: 1 },
  input: { flex: 1, height: 44, borderRadius: 22, paddingHorizontal: 14 },
  send: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" }
});
