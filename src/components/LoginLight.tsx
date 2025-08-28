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

// Taslaktaki LOGINLight görselini fonksiyonel hale getirilmiş LoginLight bileşeni.
// (Icon1.svg bulunmadığı için checkbox işaretini MaterialIcons check ile gösteriyoruz.)

// Lokal palette yerine theme.colors.brand kullanılacak

type Nav = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginLight: React.FC = () => {
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
        <View style={styles.headerWrap}>
          <Text
            style={[styles.title, { color: theme.colors.brand.darkBase }]}
          >{`Asistanınıza\n“Merhaba” deyin!`}</Text>
        </View>
        <View
          style={[
            styles.card,
            styles.elevated,
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
                  backgroundColor: theme.colors.brand.mid,
                  borderColor: theme.colors.brand.border,
                },
              ]}
            >
              <Text style={[styles.tabTextActive, { color: "#fff" }]}>
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
                  { color: theme.colors.brand.darkBase },
                ]}
              >
                Kayıt Ol
              </Text>
            </Pressable>
          </View>

          {/* Email */}
          <View style={styles.field}>
            <Text
              style={[styles.label, { color: theme.colors.brand.darkBase }]}
            >
              Email
            </Text>
            <View style={[styles.inputBox]}>
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
              style={[styles.label, { color: theme.colors.brand.darkBase }]}
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
                  borderColor: theme.colors.brand.mid,
                  backgroundColor: "#fff",
                },
                accepted && { backgroundColor: theme.colors.brand.mid },
              ]}
            >
              {accepted && (
                <MaterialIcons name="check" color="#fff" size={normalize(18)} />
              )}
            </View>
            <Text
              style={[styles.termsText, { color: theme.colors.brand.darkBase }]}
            >
              Şartlar ve Koşulları kabul ediyorum
            </Text>
          </Pressable>

          {error ? (
            <View style={styles.errorBox}>
              <MaterialIcons
                name="error"
                size={normalize(18)}
                color={theme.colors.brand.errorText}
              />
              <Text
                style={[
                  styles.errorText,
                  { color: theme.colors.brand.errorText },
                ]}
              >
                {error}
              </Text>
            </View>
          ) : null}

          <Pressable
            style={[
              styles.primaryBtn,
              { backgroundColor: theme.colors.brand.mid },
              disabled && styles.primaryBtnDisabled,
            ]}
            disabled={disabled}
            onPress={submit}
          >
            <Text style={[styles.primaryBtnText, { color: "#fff" }]}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
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
  headerWrap: { marginBottom: metrics.padding.large },
  title: {
    fontSize: normalize(40),
    fontWeight: "600",
    textAlign: "center",
  },
  card: {
    borderRadius: 15,
    borderWidth: 2,
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
    alignItems: "center",
  },
  tabTextInactive: {
    fontSize: normalize(20),
    fontWeight: "600",
    textAlign: "center",
  },
  tabTextActive: {
    fontSize: normalize(20),
    fontWeight: "600",
    textAlign: "center",
  },
  tabDivider: {
    width: 4,
    alignSelf: "stretch",
    borderRadius: 2,
    backgroundColor: "#030852",
  },
  field: { gap: normalize(8) },
  label: {
    fontSize: normalize(16),
    fontWeight: "500",
  },
  inputBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: metrics.padding.medium,
    paddingVertical: metrics.padding.small,
  },
  input: {
    fontSize: normalize(16),
    paddingVertical: 4,
  },
  termsRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  checkbox: {
    width: normalize(28),
    height: normalize(28),
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {},
  termsText: { flex: 1, fontSize: normalize(14) },
  primaryBtn: {
    paddingVertical: metrics.padding.medium,
    borderRadius: 20,
    alignItems: "center",
  },
  primaryBtnDisabled: { opacity: 0.5 },
  primaryBtnText: { fontWeight: "600", fontSize: normalize(18) },
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

export default LoginLight;
