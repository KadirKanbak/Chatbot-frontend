import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import { useTheme } from "@/styles/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { validateEmail, validatePassword } from "@/utils/validation";
import { metrics, normalize } from "@/utils/metrics";

// Tasarım kaynaklı sabit renkler (geekblue paleti) – tema ile harmanlanıyor
const palette = {
  darkBase: "#030852",
  mid: "#10239e",
  border: "#2f54eb",
  paleBorder: "#adc6ff",
  bg: "#f0f5ff",
  inputBorder: "#d6e4ff",
};

type Nav = NativeStackNavigationProp<RootStackParamList, "SignUp">;

const RegisterLight: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { theme } = useTheme();

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
      const passVal = validatePassword(password);
      if (!passVal.isValid) throw new Error(passVal.message || "Zayıf şifre");
      if (password !== confirm) throw new Error("Şifreler uyuşmuyor");
      if (!accepted) throw new Error("Şartları kabul edin");
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      navigation.navigate("Home");
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || !email || !password || !confirm || !accepted;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: palette.bg }]}>
      {/* Global Theme Toggle App seviyesinde gösteriliyor */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerWrap}>
          <Text style={styles.title}>{`Asistanınıza\n“Merhaba” deyin!`}</Text>
        </View>
        <View style={[styles.card, styles.elevated]}>
          <View style={styles.tabRow}>
            <Pressable
              style={[styles.tab, styles.tabInactive]}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={[styles.tabTextInactive]}>Giriş Yap</Text>
            </Pressable>
            <View style={styles.tabDivider} />
            <View style={[styles.tab, styles.tabActive]}>
              <Text style={styles.tabTextActive}>Kayıt Ol</Text>
            </View>
          </View>

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputBox]}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="ornek@eposta.com"
                placeholderTextColor={palette.paleBorder}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputBox}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Şifre"
                placeholderTextColor={palette.paleBorder}
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>

          {/* Confirm */}
          <View style={styles.field}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputBox}>
              <TextInput
                value={confirm}
                onChangeText={setConfirm}
                placeholder="Şifre Tekrar"
                placeholderTextColor={palette.paleBorder}
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>

          {/* Terms */}
          <Pressable
            style={styles.termsRow}
            onPress={() => setAccepted((a) => !a)}
          >
            <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
              {accepted && (
                <MaterialIcons name="check" color="#fff" size={normalize(18)} />
              )}
            </View>
            <Text style={styles.termsText}>
              Şartlar ve Koşulları kabul ediyorum
            </Text>
          </Pressable>

          {error ? (
            <View style={styles.errorBox}>
              <MaterialIcons
                name="error"
                size={normalize(18)}
                color={theme.colors.error}
              />
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {error}
              </Text>
            </View>
          ) : null}

          <Pressable
            style={[styles.primaryBtn, disabled && styles.primaryBtnDisabled]}
            disabled={disabled}
            onPress={submit}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? "Kaydediliyor..." : "Kayıt Ol"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: {
    padding: metrics.padding.large,
    flexGrow: 1,
    justifyContent: "center",
  },
  // Local theme toggle kaldırıldı
  headerWrap: { marginBottom: metrics.padding.large },
  title: {
    fontSize: normalize(40),
    fontWeight: "600",
    color: palette.darkBase,
    textAlign: "center",
  },
  card: {
    backgroundColor: palette.bg,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: palette.paleBorder,
    padding: metrics.padding.large,
    gap: normalize(24),
  },
  elevated: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  tabRow: { flexDirection: "row", alignItems: "center", gap: 20 },
  tab: {
    flex: 1,
    paddingVertical: metrics.padding.medium,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
  },
  tabInactive: { backgroundColor: palette.bg },
  tabActive: { backgroundColor: palette.mid },
  tabTextInactive: {
    fontSize: normalize(20),
    fontWeight: "600",
    textAlign: "center",
    color: palette.darkBase,
  },
  tabTextActive: {
    fontSize: normalize(20),
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
  },
  tabDivider: {
    width: normalize(4),
    alignSelf: "stretch",
    backgroundColor: palette.darkBase,
    borderRadius: 2,
  },
  field: { gap: normalize(8) },
  label: {
    fontSize: normalize(16),
    fontWeight: "500",
    color: palette.darkBase,
  },
  inputBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: palette.inputBorder,
    borderRadius: 15,
    paddingHorizontal: metrics.padding.medium,
    paddingVertical: metrics.padding.small,
  },
  input: {
    fontSize: normalize(16),
    color: palette.darkBase,
    paddingVertical: 4,
  },
  termsRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  checkbox: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: 6,
    borderWidth: 2,
    borderColor: palette.mid,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: { backgroundColor: palette.mid },
  termsText: { flex: 1, fontSize: normalize(14), color: palette.darkBase },
  primaryBtn: {
    backgroundColor: palette.mid,
    paddingVertical: metrics.padding.medium,
    borderRadius: 20,
    alignItems: "center",
  },
  primaryBtnDisabled: { opacity: 0.5 },
  primaryBtnText: { color: "#fff", fontWeight: "600", fontSize: normalize(18) },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,59,48,0.08)",
    padding: metrics.padding.medium,
    borderRadius: 12,
  },
  errorText: { fontSize: normalize(14), fontWeight: "500" },
});

export default RegisterLight;
