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
import { validateEmail } from "@/utils/validation";
import { metrics, normalize } from "@/utils/metrics";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/styles/ThemeContext";

// Lokal palet kaldırıldı; theme.colors.brand kullanılacak

type Nav = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginDark: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    try {
      if (!email) throw new Error("Email gerekli");
      if (!validateEmail(email)) throw new Error("Geçersiz email");
      if (!password) throw new Error("Şifre gerekli");
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

  const disabled = loading || !email || !password || !accepted;

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.brand.bg }]}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text
            style={[styles.title, { color: theme.colors.text.primary }]}
          >{`Asistanınıza\n“Merhaba” deyin!`}</Text>
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.brand.bg,
                borderColor: theme.colors.brand.paleBorder,
              },
            ]}
          >
            <View style={styles.tabRow}>
              <View
                style={[
                  styles.tab,
                  {
                    backgroundColor: theme.colors.brand.accent,
                    borderColor: theme.colors.brand.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabTextActive,
                    { color: theme.colors.brand.darkBase },
                  ]}
                >
                  Giriş Yap
                </Text>
              </View>
              <View style={styles.tabDivider} />
              <Pressable
                style={[
                  styles.tab,
                  {
                    backgroundColor: theme.colors.brand.bg,
                    borderColor: theme.colors.brand.border,
                  },
                ]}
                onPress={() => navigation.replace("SignUp")}
              >
                <Text
                  style={[
                    styles.tabTextInactive,
                    { color: theme.colors.text.primary },
                  ]}
                >
                  Kayıt Ol
                </Text>
              </Pressable>
            </View>

            {/* Email */}
            <View style={styles.field}>
              <Text
                style={[styles.label, { color: theme.colors.text.primary }]}
              >
                Email
              </Text>
              <View style={styles.inputBox}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ornek@eposta.com"
                  placeholderTextColor={theme.colors.brand.paleBorder}
                  style={[styles.input, { color: theme.colors.brand.darkBase }]}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text
                style={[styles.label, { color: theme.colors.text.primary }]}
              >
                Password
              </Text>
              <View style={styles.inputBox}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Şifre"
                  placeholderTextColor={theme.colors.brand.paleBorder}
                  style={[styles.input, { color: theme.colors.brand.darkBase }]}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Terms */}
            <Pressable
              style={styles.termsRow}
              onPress={() => setAccepted((a) => !a)}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: theme.colors.brand.accent,
                    backgroundColor: theme.colors.brand.darkBase,
                  },
                  accepted && { backgroundColor: theme.colors.brand.accent },
                ]}
              >
                {accepted && (
                  <MaterialIcons
                    name="check"
                    color={theme.colors.text.primary}
                    size={normalize(18)}
                  />
                )}
              </View>
              <Text
                style={[styles.termsText, { color: theme.colors.text.primary }]}
              >
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
              style={[
                styles.primaryBtn,
                { backgroundColor: theme.colors.brand.accent },
                disabled && styles.primaryBtnDisabled,
              ]}
              disabled={disabled}
              onPress={submit}
            >
              <Text
                style={[
                  styles.primaryBtnText,
                  { color: theme.colors.brand.darkBase },
                ]}
              >
                {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flexGrow: 1, padding: metrics.padding.large },
  container: {
    maxWidth: normalize(620),
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: normalize(44),
    fontWeight: "600",
    textAlign: "center",
    marginBottom: normalize(40),
  },
  card: {
    borderWidth: 2,
    borderRadius: 15,
    padding: metrics.padding.large,
    gap: normalize(24),
    shadowColor: "rgba(255,255,255,0.4)",
    shadowOpacity: 1,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  tabRow: { flexDirection: "row", gap: 20, alignItems: "center" },
  tab: {
    flex: 1,
    paddingVertical: metrics.padding.medium,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
  },
  tabTextActive: {
    fontSize: normalize(20),
    fontWeight: "600",
  },
  tabTextInactive: {
    fontSize: normalize(20),
    fontWeight: "600",
  },
  tabDivider: {
    width: 4,
    backgroundColor: "#d6e4ff",
    alignSelf: "stretch",
    borderRadius: 2,
  },
  field: { gap: normalize(8) },
  label: { fontSize: normalize(16), fontWeight: "500" },
  inputBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: metrics.padding.medium,
    paddingVertical: metrics.padding.small,
  },
  input: { fontSize: normalize(16), paddingVertical: 4 },
  termsRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  checkbox: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  termsText: { flex: 1, fontSize: normalize(14) },
  primaryBtn: {
    paddingVertical: metrics.padding.medium,
    borderRadius: 20,
    alignItems: "center",
  },
  primaryBtnDisabled: { opacity: 0.5 },
  primaryBtnText: {
    fontWeight: "600",
    fontSize: normalize(18),
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,120,117,0.15)",
    padding: metrics.padding.medium,
    borderRadius: 12,
  },
  errorText: { fontSize: normalize(14), fontWeight: "500" },
});

export default LoginDark;
