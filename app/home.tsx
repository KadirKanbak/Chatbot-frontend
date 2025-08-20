import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { router, Stack } from "expo-router";
import { ThemeContext } from "./_layout";
import Avatar, { AvatarKind } from "./components/Avatar";

type ChatPreview = {
  id: string;
  title: string;
  preview: string;
  time: string;
  unread: number;
  kind: AvatarKind;
};

const DATA: ChatPreview[] = [
  { id:"1", title:"Genel Sohbet",   preview:"Merhaba! Size nasıl yardımcı olabilirim?", time:"14:30", unread:2, kind:"general" },
  { id:"2", title:"Kod Yardımcısı", preview:"React Native ile ilgili sorularınızı...",  time:"13:45", unread:0, kind:"code" },
  { id:"3", title:"Yazılım Asistanı", preview:"TypeScript konusunda destek...",        time:"12:15", unread:1, kind:"assistant" },
  { id:"4", title:"Proje Danışmanı", preview:"Planlama ve roadmap konusunda...",       time:"11:20", unread:0, kind:"project" },
  { id:"5", title:"Öğrenme Arkadaşı", preview:"Yeni teknolojiler hakkında konuşalım!", time:"10:00", unread:3, kind:"learn" }
];

export default function Home() {
  const { theme, toggleTheme, colors: C } = useContext(ThemeContext);

  const openNewChat = () =>
    router.push({ pathname: "/chat/[id]", params: { id: "new" } });

  const openChat = (id: string) =>
    router.push({ pathname: "/chat/[id]", params: { id } });

  return (
    <View style={[s.container, { backgroundColor: C.bg }]}>
      <Stack.Screen
        options={{
          title: "Mobile ChatBot",
          headerRight: () => (
            <TouchableOpacity style={[s.themeBtn, { backgroundColor: C.primary }]} onPress={toggleTheme}>
              <Text style={{ color: "#fff" }}>{theme === "light" ? "🌙" : "☀️"}</Text>
            </TouchableOpacity>
          )
        }}
      />

      <View style={[s.hero, { backgroundColor: C.white, borderColor: C.border }]}>
        <Text style={[s.welcome, { color: C.text }]}>Tekrar Hoşgeldiniz!</Text>
        <Text style={{ color: C.sub, marginTop: 4 }}>AI destekli chatbot ile sohbet etmeye başlayın</Text>

        <TouchableOpacity style={[s.newBtn, { backgroundColor: C.primary }]} onPress={openNewChat}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>+ Yeni Sohbet</Text>
        </TouchableOpacity>
      </View>

      <Text style={[s.section, { color: C.text }]}>Son Sohbetler</Text>
      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[s.row, { backgroundColor: C.white, borderColor: C.border }]}
            onPress={() => openChat(item.id)}
          >
            <Avatar kind={item.kind} />
            <View style={{ flex: 1 }}>
              <Text style={[s.title, { color: C.text }]}>{item.title}</Text>
              <Text style={{ color: C.sub }} numberOfLines={1}>{item.preview}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: C.sub }}>{item.time}</Text>
              {item.unread ? (
                <View style={[s.badge, { backgroundColor: C.primary }]}>
                  <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>{item.unread}</Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  themeBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  hero: { borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 12 },
  welcome: { fontSize: 20, fontWeight: "800" },
  newBtn: { marginTop: 12, height: 50, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  section: { marginTop: 8, marginBottom: 8, fontWeight: "700" },
  row: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 10 },
  title: { fontSize: 15, fontWeight: "700" },
  badge: { marginTop: 6, minWidth: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center", paddingHorizontal: 6 }
});
