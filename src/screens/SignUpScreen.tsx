// NOTE: Bu ekran AuthScreen ile birleşik hale getirildi. App.tsx artık AuthScreen'i kullanıyor.
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { validateEmail, validatePassword } from "../utils/validation";
import { useTheme } from "@/styles/ThemeContext";
import { metrics, normalize } from "../utils/metrics";
import RegisterLight from "@/components/RegisterLight";
import RegisterDark from "@/components/RegisterDark";

type Nav = NativeStackNavigationProp<RootStackParamList, "SignUp">;

export default function SignUpScreen() {
  const navigation = useNavigation<Nav>();
  const { theme, themeType } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (!name.trim()) {
        throw new Error("Lütfen adınızı girin");
      }
      if (!email) {
        throw new Error("Lütfen e-posta adresinizi girin");
      }
      if (!validateEmail(email)) {
        throw new Error("Geçerli bir e-posta adresi girin");
      }
      if (!password) {
        throw new Error("Lütfen şifrenizi girin");
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message || "Geçersiz şifre");
      }

      if (password !== confirmPassword) {
        throw new Error("Şifreler eşleşmiyor");
      }

      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigation.navigate("Home");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Geçici: tasarım değişimi için flag
  const useNewDesign = true;
  if (useNewDesign) {
    return themeType === "dark" ? <RegisterDark /> : <RegisterLight />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <View
        style={[styles.background, { backgroundColor: theme.colors.primary }]}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kayıt Ol</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>
              Hoş Geldiniz
            </Text>
            <Text
              style={[styles.subtitle, { color: theme.colors.text.secondary }]}
            >
              Hesabınızı oluşturun ve AI asistanınızla sohbete başlayın
            </Text>
          </View>

          <View style={styles.inputGroup}>
            {/* Name Field */}
            <View style={styles.inputContainer}>
              <Text
                style={[styles.label, { color: theme.colors.text.secondary }]}
              >
                Ad Soyad
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  { borderColor: theme.colors.border },
                ]}
              >
                <MaterialIcons
                  name="person"
                  size={18}
                  color={theme.colors.text.secondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Adınız ve Soyadınız"
                  placeholderTextColor={theme.colors.text.secondary}
                  style={[styles.input, { color: theme.colors.text.primary }]}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text
                style={[styles.label, { color: theme.colors.text.secondary }]}
              >
                E-posta Adresi
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  { borderColor: theme.colors.border },
                ]}
              >
                <MaterialIcons
                  name="mail"
                  size={18}
                  color={theme.colors.text.secondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ornek@eposta.com"
                  placeholderTextColor={theme.colors.text.secondary}
                  style={[styles.input, { color: theme.colors.text.primary }]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <Text
                style={[styles.label, { color: theme.colors.text.secondary }]}
              >
                Şifre
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  { borderColor: theme.colors.border },
                ]}
              >
                <MaterialIcons
                  name="lock"
                  size={18}
                  color={theme.colors.text.secondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Şifreniz"
                  placeholderTextColor={theme.colors.text.secondary}
                  style={[styles.input, { color: theme.colors.text.primary }]}
                  secureTextEntry={!showPassword}
                  autoComplete="new-password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility-off" : "visibility"}
                    size={18}
                    color={theme.colors.text.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Field */}
            <View style={styles.inputContainer}>
              <Text
                style={[styles.label, { color: theme.colors.text.secondary }]}
              >
                Şifre (Tekrar)
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  { borderColor: theme.colors.border },
                ]}
              >
                <MaterialIcons
                  name="lock"
                  size={18}
                  color={theme.colors.text.secondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Şifrenizi tekrar girin"
                  placeholderTextColor={theme.colors.text.secondary}
                  style={[styles.input, { color: theme.colors.text.primary }]}
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="new-password"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility-off" : "visibility"}
                    size={18}
                    color={theme.colors.text.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {error ? (
              <View
                style={[
                  styles.errorContainer,
                  { backgroundColor: theme.colors.error + "15" },
                ]}
              >
                <MaterialIcons
                  name="error"
                  size={20}
                  color={theme.colors.error}
                />
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  {error}
                </Text>
              </View>
            ) : null}

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={isLoading}
              style={[
                styles.button,
                { backgroundColor: theme.colors.primary },
                isLoading && styles.buttonDisabled,
              ]}
            >
              {isLoading ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator color="white" />
                  <Text style={styles.buttonText}>Kaydediliyor...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <MaterialIcons name="person-add" size={20} color="white" />
                  <Text style={styles.buttonText}>Kayıt Ol</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.footer}>
              <Text
                style={[
                  styles.footerText,
                  { color: theme.colors.text.secondary },
                ]}
              >
                Zaten bir hesabınız var mı?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={[styles.footerLink, { color: theme.colors.primary }]}
                >
                  Giriş Yapın
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: metrics.padding.medium,
    paddingTop:
      Platform.OS === "ios"
        ? metrics.padding.xlarge * 2
        : metrics.padding.xlarge,
    paddingBottom: metrics.padding.medium,
    height: metrics.headerHeight,
  },
  headerTitle: {
    fontSize: metrics.fontSize.large,
    fontWeight: "600",
    color: "white",
  },
  headerSpacer: {
    width: normalize(48),
  },
  backButton: {
    padding: metrics.padding.small,
    borderRadius: metrics.borderRadius.large,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: metrics.padding.large,
  },
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: metrics.borderRadius.xlarge,
    padding: metrics.padding.large,
    width: "100%",
    maxWidth: normalize(450),
    alignSelf: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: normalize(20),
        shadowOffset: { width: 0, height: normalize(10) },
      },
      android: { elevation: 10 },
    }),
  },
  titleContainer: {
    marginBottom: metrics.padding.xlarge,
  },
  title: {
    fontSize: metrics.fontSize.xxlarge,
    fontWeight: "700",
    marginBottom: metrics.padding.small,
    textAlign: "center",
  },
  subtitle: {
    fontSize: metrics.fontSize.medium,
    textAlign: "center",
    marginHorizontal: metrics.padding.large,
    lineHeight: normalize(24),
  },
  inputGroup: {
    marginBottom: metrics.padding.large,
  },
  inputContainer: {
    marginBottom: metrics.padding.medium,
  },
  label: {
    fontSize: metrics.fontSize.small,
    fontWeight: "600",
    marginBottom: metrics.padding.small,
    marginLeft: metrics.padding.small / 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: metrics.borderRadius.medium,
    borderWidth: 1,
    paddingHorizontal: metrics.padding.medium,
    minHeight: normalize(56),
  },
  inputIcon: {
    marginRight: metrics.padding.medium,
  },
  input: {
    flex: 1,
    fontSize: metrics.fontSize.medium,
    minHeight: normalize(56),
  },
  eyeIcon: {
    padding: metrics.padding.small,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: metrics.padding.medium,
    borderRadius: metrics.borderRadius.medium,
    marginBottom: metrics.padding.medium,
  },
  errorText: {
    marginLeft: metrics.padding.small,
    flex: 1,
    fontSize: metrics.fontSize.small,
  },
  button: {
    minHeight: normalize(56),
    borderRadius: metrics.borderRadius.large,
    marginTop: metrics.padding.small,
    marginBottom: metrics.padding.large,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: normalize(8),
        shadowOffset: { width: 0, height: normalize(4) },
      },
      android: { elevation: 5 },
    }),
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: metrics.padding.medium,
  },
  buttonText: {
    color: "white",
    fontSize: metrics.fontSize.medium,
    fontWeight: "600",
    marginLeft: metrics.padding.small,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: metrics.padding.medium,
  },
  footerText: {
    fontSize: metrics.fontSize.small,
  },
  footerLink: {
    fontSize: metrics.fontSize.small,
    fontWeight: "600",
  },
});
