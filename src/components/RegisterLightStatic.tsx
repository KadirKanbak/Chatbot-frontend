import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import { validateEmail, validatePassword } from "@/utils/validation";

// Bu bileşen, sizin paylaştığınız statik CHATBOTDark düzeninin (header + büyük arka blok + alt panel) light register uyarlaması.
// Mevcut RegisterLight bozulmadan bırakıldı; onaylarsanız RegisterLight.tsx yerine bunu kullanabilir veya dosyayı yeniden adlandırabiliriz.

type Nav = NativeStackNavigationProp<RootStackParamList, "SignUp">;

const palette = {
  bg: "#f0f5ff",
  headerBg: "rgba(133,165,255,0.5)",
  panelBg: "rgba(133,165,255,0.5)",
  border: "#adc6ff",
  accent: "#10239e",
  darkText: "#030852",
  inputBorder: "#d6e4ff",
};

const RegisterLightStatic: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    try {
      if (!email) throw new Error("Email gerekli");
      if (!validateEmail(email)) throw new Error("Geçersiz email");
      if (!password) throw new Error("Şifre gerekli");
      const pv = validatePassword(password);
      if (!pv.isValid) throw new Error(pv.message || "Zayıf şifre");
      if (password !== confirm) throw new Error("Şifreler uyuşmuyor");
      if (!accepted) throw new Error("Şartları kabul edin");
      setLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      navigation.navigate("Home");
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || !email || !password || !confirm || !accepted;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.canvas}>
        {/* Üst Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FinPal</Text>
          <Pressable
            style={styles.headerIcon}
            onPress={() => navigation.replace("Login")}
          >
            <MaterialIcons name="arrow-back" size={32} color={palette.bg} />
          </Pressable>
        </View>

        {/* Orta büyük blok (tasarımda frameParent analoğu) */}
        <View style={styles.middleBlock} />

        {/* Örnek dekor kutular - isterseniz kaldırılabilir */}
        <View style={[styles.decorBox, { left: 47 }]} />
        <View style={[styles.decorBox, { left: 152 }]} />
        <View style={[styles.decorBox, { left: 257 }]} />

        {/* Alt panel -> Kayıt formu */}
        <View style={styles.formPanel}>
          <Text style={styles.title}>{`Asistanınıza\n“Merhaba” deyin!`}</Text>
          <View style={styles.switchRow}>
            <Pressable
              style={[styles.switchBtn, styles.switchInactive]}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={[styles.switchTextInactive]}>Giriş Yap</Text>
            </Pressable>
            <View style={styles.switchDivider} />
            <View style={[styles.switchBtn, styles.switchActive]}>
              <Text style={styles.switchTextActive}>Kayıt Ol</Text>
            </View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputBox}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="ornek@eposta.com"
                placeholderTextColor="#6f87b6"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputBox}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Şifre"
                placeholderTextColor="#6f87b6"
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputBox}>
              <TextInput
                value={confirm}
                onChangeText={setConfirm}
                placeholder="Şifre Tekrar"
                placeholderTextColor="#6f87b6"
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>
          <Pressable
            style={styles.checkboxRow}
            onPress={() => setAccepted((a) => !a)}
          >
            <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
              {accepted && (
                <MaterialIcons name="check" size={20} color={palette.bg} />
              )}
            </View>
            <Text style={styles.checkboxLabel}>
              Şartlar ve Koşulları kabul ediyorum
            </Text>
          </Pressable>
          {error ? (
            <View style={styles.errorBox}>
              <MaterialIcons name="error" size={20} color="#d32f2f" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          <Pressable
            style={[styles.submitBtn, disabled && styles.disabled]}
            disabled={disabled}
            onPress={submit}
          >
            <Text style={styles.submitText}>
              {loading ? "Kaydediliyor..." : "Kayıt Ol"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  canvas: { flex: 1, width: "100%", height: 1912 },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 880,
    height: 152,
    backgroundColor: palette.headerBg,
    borderBottomWidth: 4,
    borderColor: palette.accent,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  headerTitle: { fontSize: 48, fontWeight: "600", color: palette.accent },
  headerIcon: {
    position: "absolute",
    left: 24,
    top: 52,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  middleBlock: {
    position: "absolute",
    top: 150,
    left: 0,
    width: 880,
    height: 1762,
    backgroundColor: "#ffffff",
  },
  decorBox: {
    position: "absolute",
    top: 158,
    width: 50,
    height: 50,
    backgroundColor: "#d9d9d9",
    borderRadius: 8,
  },
  formPanel: {
    position: "absolute",
    left: "50%",
    marginLeft: -442,
    top: 1428,
    width: 884,
    height: 486,
    backgroundColor: palette.panelBg,
    borderColor: palette.accent,
    borderWidth: 4,
    borderRadius: 20,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOpacity: 1,
    shadowRadius: 22.4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 22,
    padding: 46,
  },
  title: {
    fontSize: 56,
    lineHeight: 64,
    fontWeight: "600",
    color: palette.accent,
    textAlign: "center",
    marginBottom: 24,
  },
  switchRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  switchBtn: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switchInactive: { backgroundColor: palette.bg, borderColor: palette.accent },
  switchActive: {
    backgroundColor: palette.accent,
    borderColor: palette.accent,
  },
  switchTextInactive: {
    fontSize: 28,
    fontWeight: "600",
    color: palette.accent,
  },
  switchTextActive: { fontSize: 28, fontWeight: "600", color: palette.bg },
  switchDivider: {
    width: 4,
    height: 72,
    backgroundColor: palette.accent,
    marginHorizontal: 20,
  },
  field: { marginBottom: 18 },
  label: { fontSize: 28, color: palette.accent, marginBottom: 8 },
  inputBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: palette.inputBorder,
    borderRadius: 15,
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  input: { fontSize: 28, color: palette.darkText, padding: 0 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: 4,
    marginBottom: 18,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: palette.accent,
    backgroundColor: palette.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: { backgroundColor: palette.accent },
  checkboxLabel: { flex: 1, fontSize: 24, color: palette.accent },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffecec",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  errorText: { color: "#d32f2f", fontSize: 16, flex: 1 },
  submitBtn: {
    marginTop: 4,
    backgroundColor: palette.accent,
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  submitText: { fontSize: 30, fontWeight: "600", color: palette.bg },
  disabled: { opacity: 0.5 },
});

export default RegisterLightStatic;
