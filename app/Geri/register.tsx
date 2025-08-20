import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Link, router } from "expo-router";
import { ThemeContext } from "../_layout";

export default function Register() {
  const { colors: C } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  const submit = () => {
    if (!name || !user || !pass || !pass2) return Alert.alert("Eksik bilgi", "Lütfen tüm alanları doldurun.");
    if (pass !== pass2) return Alert.alert("Hata", "Şifreler eşleşmiyor.");
    // TODO: gerçek API
    router.replace("/home");
  };

  return (
    <View style={[s.container, { backgroundColor: C.bg }]}>
      <View style={[s.header, { borderColor: C.border }]}>
        <Text style={[s.brand, { color: C.primary }]}>AI Chat</Text>
      </View>

      <Text style={[s.h1, { color: C.text }]}>Kayıt Ol</Text>
      <Text style={[s.desc, { color: C.sub }]}>Hemen bir hesap oluşturun ve AI asistanınızla sohbete başlayın</Text>

      <Text style={[s.section, { color: C.text }]}>Hesap Bilgileri</Text>

      <Text style={[s.label, { color: C.sub }]}>Ad Soyad</Text>
      <TextInput style={[s.input, { borderColor: C.border, backgroundColor: C.white }]} placeholder="Adınız Soyadınız" value={name} onChangeText={setName} />

      <Text style={[s.label, { color: C.sub }]}>E-posta veya Kullanıcı Adı</Text>
      <TextInput style={[s.input, { borderColor: C.border, backgroundColor: C.white }]} placeholder="ornek@eposta.com" autoCapitalize="none" value={user} onChangeText={setUser} />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={[s.label, { color: C.sub }]}>Şifre</Text>
          <TextInput style={[s.input, { borderColor: C.border, backgroundColor: C.white }]} placeholder="••••••••" secureTextEntry value={pass} onChangeText={setPass} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[s.label, { color: C.sub }]}>Şifre (Tekrar)</Text>
          <TextInput style={[s.input, { borderColor: C.border, backgroundColor: C.white }]} placeholder="••••••••" secureTextEntry value={pass2} onChangeText={setPass2} />
        </View>
      </View>

      <TouchableOpacity style={[s.btn, { backgroundColor: C.primary }]} onPress={submit}>
        <Text style={s.btnTxt}>Kayıt Ol</Text>
      </TouchableOpacity>

      <Text style={[s.bottom, { color: C.sub }]}>
        Zaten hesabınız var mı? <Link href="/Geri/login" style={[s.link, { color: C.primary }]}>Giriş Yap</Link>
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { height: 46, alignItems: "center", flexDirection: "row", borderBottomWidth: 1, marginBottom: 8 },
  brand: { fontSize: 18, fontWeight: "800" },
  h1: { fontSize: 20, fontWeight: "800", marginTop: 6 },
  desc: { marginTop: 6 },
  section: { marginTop: 14, fontWeight: "700", marginBottom: 6 },
  label: { marginTop: 10, marginBottom: 6, fontSize: 12 },
  input: { height: 48, borderRadius: 12, borderWidth: 1, paddingHorizontal: 14 },
  btn: { marginTop: 16, height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  btnTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
  bottom: { textAlign: "center", marginTop: 12 },
  link: { fontWeight: "700" }
});
