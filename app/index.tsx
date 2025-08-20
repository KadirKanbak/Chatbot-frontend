import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Link, Stack } from "expo-router";
import { ThemeContext } from "./_layout";

export default function HomeLanding() {
  const { theme, toggleTheme, colors: C } = useContext(ThemeContext);

  return (
    <ImageBackground
      source={require("../assets/images/background.png")} // kendi resmin
      style={styles.bg}
      resizeMode="cover"
    >
      <Stack.Screen options={{ headerShown: false }} />

      {/* Arka plan maskeleme */}
      <View
        style={[
          styles.overlay,
          {
            backgroundColor:
              theme === "light" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)",
          },
        ]}
      />

      {/* İçerik */}
      <View style={styles.center}>
        <Text style={[styles.h1, { color: C.primary }]}>AI Chatbot</Text>
        <Text style={[styles.h1, { color: C.primary }]}>ile Sohbet</Text>
        <Text style={[styles.h1, { color: C.primary }]}>Deneyimi</Text>

        <Text
          style={[
            styles.sub,
            { color: theme === "light" ? "#111827" : "#E5E7EB" },
          ]}
        >
          AI destekli chatbot ile hemen başlayın
        </Text>

        {/* Kayıt Ol butonu */}
        <Link href="/Geri/register" asChild>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: C.primary }]}
          >
            <Text style={styles.primaryTxt}>Kayıt Ol</Text>
          </TouchableOpacity>
        </Link>

        {/* Giriş Yap butonu */}
        <Link href="/Geri/login" asChild>
          <TouchableOpacity style={styles.textBtn}>
            <Text style={[styles.link, { color: C.primary }]}>Giriş Yap →</Text>
          </TouchableOpacity>
        </Link>

        {/* Tema butonu */}
        <TouchableOpacity
          style={[
            styles.themeBtn,
            {
              borderColor:
                theme === "light"
                  ? "rgba(0,0,0,0.08)"
                  : "rgba(255,255,255,0.2)",
            },
          ]}
          onPress={toggleTheme}
        >
          <Text
            style={{
              color: theme === "light" ? "#111827" : "#F9FAFB",
            }}
          >
            {theme === "light" ? "🌙 Karanlık" : "☀️ Aydınlık"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  h1: { fontSize: 30, fontWeight: "800", lineHeight: 34 },
  sub: { marginTop: 10, fontSize: 14, textAlign: "center" },
  primaryBtn: {
    marginTop: 28,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    elevation: 2,
  },
  primaryTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
  textBtn: { marginTop: 16 },
  link: { fontWeight: "700", fontSize: 15 },
  themeBtn: {
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
});
