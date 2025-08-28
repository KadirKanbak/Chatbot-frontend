import React, { useState, useEffect } from "react";
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
  LayoutAnimation,
  UIManager,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/styles/ThemeContext";
import { metrics, normalize } from "@/utils/metrics";
import { validateEmail, validatePassword } from "@/utils/validation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type AuthMode = "login" | "signup";

interface AuthScreenProps
  extends Partial<NativeStackScreenProps<RootStackParamList, "Login">> {
  initialMode?: AuthMode;
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  navigation,
  route,
  initialMode = "login",
}) => {
  const { theme, themeType } = useTheme();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // shared fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // When route comes from navigation to specific screen ensure correct start mode
  useEffect(() => {
    const rName = (route as any)?.name as string | undefined;
    if (rName === "SignUp" && mode !== "signup") setMode("signup");
    else if (rName === "Login" && mode !== "login") setMode("login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const switchMode = (target: AuthMode) => {
    if (mode === target) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setError("");
    setSuccess("");
    setMode(target);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      if (mode === "signup") {
        if (!name.trim()) throw new Error("Lütfen adınızı girin");
      }
      if (!email) throw new Error("Lütfen e-posta adresinizi girin");
      if (!validateEmail(email))
        throw new Error("Geçerli bir e-posta adresi girin");
      if (!password) throw new Error("Lütfen şifrenizi girin");
      const pwResult = validatePassword(password);
      if (!pwResult.isValid)
        throw new Error(pwResult.message || "Geçersiz şifre");
      if (mode === "signup") {
        if (password !== confirmPassword)
          throw new Error("Şifreler eşleşmiyor");
      }
      await new Promise((r) => setTimeout(r, 1200));
      if (mode === "signup") {
        setSuccess("Kayıt başarılı!");
        // Opsiyonel: otomatik login simülasyonu
        await new Promise((r) => setTimeout(r, 400));
        navigation?.navigate("Home");
      } else {
        navigation?.navigate("Home");
      }
    } catch (e: any) {
      setError(e.message || "Hata");
    } finally {
      setIsLoading(false);
    }
  };

  const isSignup = mode === "signup";

  const bgCard =
    themeType === "dark" ? theme.colors.brand.bg : "rgba(255,255,255,0.95)";
  const fieldBg =
    themeType === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.95)";

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[s.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={s.backBtn}
        >
          <MaterialIcons
            name="arrow-back"
            size={normalize(22)}
            color={theme.colors.text.inverse}
          />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: theme.colors.text.inverse }]}>
          {isSignup ? "Kayıt Ol" : "Giriş Yap"}
        </Text>
        <View style={s.headerSpacer} />
      </View>
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            s.card,
            { backgroundColor: bgCard, borderColor: theme.colors.border },
          ]}
        >
          <View style={s.modeTabsWrap}>
            <TouchableOpacity
              onPress={() => switchMode("login")}
              style={[
                s.modeTab,
                isSignup
                  ? null
                  : [
                      s.modeTabActive,
                      { backgroundColor: theme.colors.primary },
                    ],
              ]}
            >
              <Text
                style={[
                  s.modeTabText,
                  {
                    color: isSignup
                      ? theme.colors.text.secondary
                      : theme.colors.text.inverse,
                  },
                ]}
              >
                Giriş
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => switchMode("signup")}
              style={[
                s.modeTab,
                isSignup
                  ? [s.modeTabActive, { backgroundColor: theme.colors.primary }]
                  : null,
              ]}
            >
              <Text
                style={[
                  s.modeTabText,
                  {
                    color: isSignup
                      ? theme.colors.text.inverse
                      : theme.colors.text.secondary,
                  },
                ]}
              >
                Kayıt
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[s.title, { color: theme.colors.primary }]}>
            {isSignup ? "Yeni bir hesap oluşturun" : "Tekrar hoş geldiniz"}
          </Text>
          <Text style={[s.subtitle, { color: theme.colors.text.secondary }]}>
            {isSignup
              ? "Finans asistanınızı kullanmaya başlayın"
              : "Hesabınıza erişin ve devam edin"}
          </Text>

          {isSignup && (
            <View style={s.fieldBlock}>
              <Text style={[s.label, { color: theme.colors.text.secondary }]}>
                Ad Soyad
              </Text>
              <View
                style={[
                  s.fieldWrapper,
                  {
                    backgroundColor: fieldBg,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <MaterialIcons
                  name="person"
                  size={18}
                  color={theme.colors.text.secondary}
                  style={s.icon}
                />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Adınız ve Soyadınız"
                  placeholderTextColor={theme.colors.text.secondary}
                  style={[s.input, { color: theme.colors.text.primary }]}
                  autoCapitalize="words"
                />
              </View>
            </View>
          )}

          <View style={s.fieldBlock}>
            <Text style={[s.label, { color: theme.colors.text.secondary }]}>
              E-posta
            </Text>
            <View
              style={[
                s.fieldWrapper,
                { backgroundColor: fieldBg, borderColor: theme.colors.border },
              ]}
            >
              <MaterialIcons
                name="mail"
                size={18}
                color={theme.colors.text.secondary}
                style={s.icon}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="ornek@eposta.com"
                placeholderTextColor={theme.colors.text.secondary}
                style={[s.input, { color: theme.colors.text.primary }]}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={s.fieldBlock}>
            <Text style={[s.label, { color: theme.colors.text.secondary }]}>
              Şifre
            </Text>
            <View
              style={[
                s.fieldWrapper,
                { backgroundColor: fieldBg, borderColor: theme.colors.border },
              ]}
            >
              <MaterialIcons
                name="lock"
                size={18}
                color={theme.colors.text.secondary}
                style={s.icon}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Şifreniz"
                placeholderTextColor={theme.colors.text.secondary}
                style={[s.input, { color: theme.colors.text.primary }]}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((p) => !p)}
                style={s.eyeBtn}
              >
                <MaterialIcons
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={18}
                  color={theme.colors.text.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {isSignup && (
            <View style={s.fieldBlock}>
              <Text style={[s.label, { color: theme.colors.text.secondary }]}>
                Şifre (Tekrar)
              </Text>
              <View
                style={[
                  s.fieldWrapper,
                  {
                    backgroundColor: fieldBg,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <MaterialIcons
                  name="lock"
                  size={18}
                  color={theme.colors.text.secondary}
                  style={s.icon}
                />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Şifrenizi tekrar"
                  placeholderTextColor={theme.colors.text.secondary}
                  style={[s.input, { color: theme.colors.text.primary }]}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword((p) => !p)}
                  style={s.eyeBtn}
                >
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility-off" : "visibility"}
                    size={18}
                    color={theme.colors.text.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!!error && (
            <View
              style={[
                s.feedbackBox,
                { backgroundColor: theme.colors.error + "15" },
              ]}
            >
              <MaterialIcons
                name="error"
                size={18}
                color={theme.colors.error}
              />
              <Text style={[s.feedbackText, { color: theme.colors.error }]}>
                {error}
              </Text>
            </View>
          )}
          {!!success && (
            <View
              style={[
                s.feedbackBox,
                { backgroundColor: theme.colors.success + "15" },
              ]}
            >
              <MaterialIcons
                name="check-circle"
                size={18}
                color={theme.colors.success}
              />
              <Text style={[s.feedbackText, { color: theme.colors.success }]}>
                {success}
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            style={[
              s.submitBtn,
              { backgroundColor: theme.colors.primary },
              isLoading && { opacity: 0.7 },
            ]}
            activeOpacity={0.9}
          >
            {isLoading ? (
              <View style={s.btnInner}>
                <ActivityIndicator color={theme.colors.text.inverse} />
                <Text style={[s.btnText, { color: theme.colors.text.inverse }]}>
                  İşleniyor...
                </Text>
              </View>
            ) : (
              <View style={s.btnInner}>
                <MaterialIcons
                  name={isSignup ? "person-add" : "login"}
                  size={20}
                  color={theme.colors.text.inverse}
                />
                <Text style={[s.btnText, { color: theme.colors.text.inverse }]}>
                  {isSignup ? "Kayıt Ol" : "Giriş Yap"}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => switchMode(isSignup ? "login" : "signup")}
            style={s.altLinkWrap}
          >
            <Text style={[s.altLinkText, { color: theme.colors.primary }]}>
              {isSignup
                ? "Zaten hesabım var, giriş yap"
                : "Hesabım yok, hesap oluştur"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: metrics.padding.medium,
    paddingTop:
      Platform.OS === "ios"
        ? metrics.padding.xlarge * 2
        : metrics.padding.xlarge,
    paddingBottom: metrics.padding.medium,
  },
  backBtn: { padding: metrics.padding.small },
  headerTitle: {
    fontSize: metrics.fontSize.large,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: { width: normalize(44) },
  scroll: { flexGrow: 1, padding: metrics.padding.large },
  card: {
    borderRadius: metrics.borderRadius.xlarge,
    padding: metrics.padding.large,
    width: "100%",
    maxWidth: normalize(480),
    alignSelf: "center",
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: normalize(18),
        shadowOffset: { width: 0, height: normalize(10) },
      },
      android: { elevation: 10 },
    }),
  },
  modeTabsWrap: {
    flexDirection: "row",
    backgroundColor: "rgba(127,127,127,0.1)",
    borderRadius: 16,
    padding: 4,
    marginBottom: metrics.padding.large,
  },
  modeTab: {
    flex: 1,
    paddingVertical: metrics.padding.small + 2,
    borderRadius: 12,
    alignItems: "center",
  },
  modeTabActive: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  modeTabText: { fontSize: normalize(15), fontWeight: "600" },
  title: {
    fontSize: metrics.fontSize.xlarge,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: metrics.fontSize.small + 1,
    textAlign: "center",
    marginTop: metrics.padding.small,
    marginBottom: metrics.padding.large,
  },
  fieldBlock: { marginBottom: metrics.padding.medium },
  label: {
    fontSize: metrics.fontSize.small,
    fontWeight: "600",
    marginBottom: metrics.padding.small / 2,
    marginLeft: metrics.padding.small / 2,
  },
  fieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: metrics.borderRadius.medium,
    paddingHorizontal: metrics.padding.medium,
    minHeight: normalize(54),
  },
  icon: { marginRight: metrics.padding.medium },
  input: { flex: 1, fontSize: metrics.fontSize.medium },
  eyeBtn: { padding: metrics.padding.small },
  feedbackBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: metrics.padding.medium,
    borderRadius: metrics.borderRadius.medium,
    marginBottom: metrics.padding.medium,
  },
  feedbackText: {
    marginLeft: metrics.padding.small,
    flex: 1,
    fontSize: metrics.fontSize.small,
  },
  submitBtn: {
    borderRadius: metrics.borderRadius.large,
    minHeight: normalize(54),
    justifyContent: "center",
    marginTop: metrics.padding.small,
  },
  btnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: metrics.padding.small,
  },
  btnText: {
    fontSize: metrics.fontSize.medium,
    fontWeight: "600",
    marginLeft: metrics.padding.small,
  },
  altLinkWrap: { marginTop: metrics.padding.medium, alignItems: "center" },
  altLinkText: { fontSize: metrics.fontSize.small, fontWeight: "600" },
});

export default AuthScreen;
