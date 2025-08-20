import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Link, router } from "expo-router";
import { ThemeContext } from "../_layout";

export default function Login() {
  const { colors: C } = useContext(ThemeContext);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState(""); // 👈 burada sadece "const" olmalı

  const submit = () => {
    if (!user || !pass) return Alert.alert("Eksik bilgi", "E-posta/kullanıcı adı ve şifre gerekli.");
    // TODO: gerçek API
    router.replace("/home");
  };

  return (
    <View style={[s.container, { backgroundColor: C.bg }]}>
      <View style={[s.header, { borderColor: C.border }]}>
        <Text style={[s.brand, { color: C.primary }]}>AI Chat</Text>
      </View>

      <Text style={[s.h1, { color: C.text }]}>Giriş Yap</Text>
      <Text style={{ color: C.sub, marginTop: 6 }}>
        Hesabınıza giriş yapın ve AI asistanınızla sohbete devam edin
      </Text>

      <Text style={[s.section, { color: C.text }]}>Giriş Bilgileri</Text>

      <Text style={[s.label, { color: C.sub }]}>E-posta veya Kullanıcı Adı</Text>
      <TextInput
        style={[s.input, { borderColor: C.border, backgroundColor: C.white }]}
        placeholder="ornek@eposta.com"
        autoCapitalize="none"
        value={user}
        onChangeText={setUser}
      />

      <Text style={[s.label, { color: C.sub }]}>Şifre</Text>
      <TextInput
        style={[s.input, { borderColor: C.border, backgroundColor: C.white }]}
        placeholder="••••••••"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <TouchableOpacity style={[s.btn, { backgroundColor: C.primary }]} onPress={submit}>
        <Text style={s.btnTxt}>Giriş Yap</Text>
      </TouchableOpacity>

      <Text style={[s.bottom, { color: C.sub }]}>
        Hesabınız yok mu?{" "}
        <Link href="/Geri/register" style={[s.link, { color: C.primary }]}>
          Kayıt Ol
        </Link>
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { height: 46, alignItems: "center", flexDirection: "row", borderBottomWidth: 1, marginBottom: 8 },
  brand: { fontSize: 18, fontWeight: "800" },
  h1: { fontSize: 20, fontWeight: "800", marginTop: 6 },
  section: { marginTop: 14, fontWeight: "700", marginBottom: 6 },
  label: { marginTop: 10, marginBottom: 6, fontSize: 12 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 14 },
  btn: { marginTop: 16, height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  btnTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
  bottom: { textAlign: "center", marginTop: 12 },
  link: { fontWeight: "700" }
});
