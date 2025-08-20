import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { validateEmail, isValidUsername } from "../utils/validation";
import { useTheme } from "../styles/ThemeContext";
import { ThemeToggleButton } from "../components/ThemeToggleButton";

type Nav = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const { theme, themeType } = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeToggleButton />,
    });
  }, [navigation]);
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    input: {
      backgroundColor: theme.colors.surface,
      color: theme.colors.text.primary,
      borderColor: theme.colors.border,
    },
    label: {
      color: theme.colors.text.primary,
    },
    errorText: {
      color: theme.colors.error,
    },
    link: {
      color: theme.colors.primary,
    },
  });

  const onSubmit = () => {
    setError("");

    if (!emailOrUser) {
      setError("Lütfen e-posta adresinizi veya kullanıcı adınızı girin");
      return;
    }

    // E-posta veya kullanıcı adı formatını kontrol et
    if (emailOrUser.includes("@")) {
      if (!validateEmail(emailOrUser)) {
        setError("Geçerli bir e-posta adresi girin");
        return;
      }
    } else {
      if (!isValidUsername(emailOrUser)) {
        setError("Geçerli bir kullanıcı adı girin");
        return;
      }
    }

    if (!password) {
      setError("Lütfen şifrenizi girin");
      return;
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return;
    }

    navigation.navigate("Home");
  };

  const gradientColors =
    themeType === "light"
      ? (["#F0F5FF", "#D6E4FF", "#ADC6FF"] as const)
      : (["#1F2140", "#2C2E47", "#3A3D66"] as const);

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.logoBox,
              { backgroundColor: theme.colors.primary + "15" },
            ]}
          >
            <Ionicons
              name="chatbubbles"
              size={18}
              color={theme.colors.primary}
            />
          </View>
          <Text style={[styles.brandTitle, { color: theme.colors.primary }]}>
            Mobi Chat
          </Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View
          style={[styles.rightPane, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.welcome, { color: theme.colors.text.primary }]}>
            Tekrar Hoşgeldiniz
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.text.secondary }]}
          >
            Hesabınıza giriş yaparak AI asistanınızla sohbete devam edin
          </Text>
        </View>

        {/* Form Section */}
        <View
          style={[styles.formPane, { backgroundColor: theme.colors.surface }]}
        >
          <View style={styles.inputGroup}>
            <View style={styles.inputWrap}>
              <Text
                style={[styles.label, { color: theme.colors.text.secondary }]}
              >
                E-posta veya Kullanıcı Adı
              </Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={theme.colors.text.secondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text.primary,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder="ornek@eposta.com"
                  placeholderTextColor={theme.colors.text.secondary + "80"}
                  autoCapitalize="none"
                  value={emailOrUser}
                  onChangeText={setEmailOrUser}
                />
              </View>
            </View>

            <View style={styles.inputWrap}>
              <Text
                style={[styles.label, { color: theme.colors.text.secondary }]}
              >
                Şifre
              </Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={theme.colors.text.secondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text.primary,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder="••••••••"
                  placeholderTextColor={theme.colors.text.secondary + "80"}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>
          </View>

          {error ? (
            <View
              style={[
                styles.errorContainer,
                { backgroundColor: theme.colors.error + "15" },
              ]}
            >
              <Ionicons
                name="alert-circle"
                size={20}
                color={theme.colors.error}
              />
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {error}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.cta, { backgroundColor: theme.colors.primary }]}
            onPress={onSubmit}
            activeOpacity={0.9}
          >
            <Ionicons name="log-in-outline" size={20} color="#fff" />
            <Text style={styles.ctaText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => {
              /* Şifremi unuttum işlevi */
            }}
          >
            <Text
              style={[
                styles.forgotText,
                { color: theme.colors.text.secondary },
              ]}
            >
              Şifrenizi mi unuttunuz?
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: theme.colors.border },
              ]}
            />
            <Text
              style={[
                styles.dividerText,
                { color: theme.colors.text.secondary },
              ]}
            >
              veya
            </Text>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: theme.colors.border },
              ]}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: theme.colors.background },
            ]}
            onPress={() => {
              /* Google ile giriş */
            }}
          >
            <Ionicons
              name="logo-google"
              size={20}
              color={theme.colors.text.primary}
            />
            <Text
              style={[
                styles.socialButtonText,
                { color: theme.colors.text.primary },
              ]}
            >
              Google ile devam et
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text
              style={[
                styles.switchText,
                { color: theme.colors.text.secondary },
              ]}
            >
              Hesabınız yok mu?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={[styles.link, { color: theme.colors.primary }]}>
                Hemen Kayıt Olun
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const CARD_BG = "#FFFFFF";
const BORDER = "#E8E9FF";

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 16,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 8 },
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  rightPane: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  formPane: {
    flex: 1,
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputWrap: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
  },
  cta: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  forgotPassword: {
    alignItems: "center",
    padding: 16,
  },
  forgotText: {
    fontSize: 14,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderRadius: 12,
    marginBottom: 16,
  },
  socialButtonText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  switchText: {
    fontSize: 14,
  },
  link: {
    fontWeight: "600",
  },
  cornerGlow: {
    position: "absolute",
    right: -40,
    top: -20,
    width: 280,
    height: 160,
    borderRadius: 140,
    opacity: 0.8,
  },
});
