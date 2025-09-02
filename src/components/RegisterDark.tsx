import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import { validateEmail, validatePassword } from "@/utils/validation";

// Dark register static design (user snippet) + functional form logic
// Icon1.svg not present; using MaterialIcons check inside the checkbox.

type Nav = NativeStackNavigationProp<RootStackParamList, "SignUp">;

const palette = {
  bg: "#030852",
  accent: "#85a5ff",
  border: "#2f54eb",
  paleBorder: "#adc6ff",
  inputBorder: "#d6e4ff",
  lightBg: "#f0f5ff",
};

const RegisterDark: React.FC = () => {
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
      const v = validatePassword(password);
      if (!v.isValid) throw new Error(v.message || "Zayıf şifre");
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
    <SafeAreaView style={styles.logInDark}>
      <View style={styles.view}>
        <View style={styles.asistannzaMerhabaDeyinParent}>
          <Text
            style={styles.asistannzaMerhabaDeyin}
          >{`Asistanınıza\n“Merhaba” deyin!`}</Text>
          <View style={styles.formRegister}>
            {/* Top button group */}
            <View style={[styles.buttonGroup, styles.buttonGroupFlexBox]}>
              <Pressable
                style={[styles.buttonDark, styles.buttonSpaceBlock]}
                onPress={() => navigation.replace("Login")}
              >
                <Text style={[styles.button, styles.buttonTypo]}>
                  Giriş Yap
                </Text>
              </Pressable>
              <View
                style={[styles.buttonGroupChild, styles.buttonGroupLayout]}
              />
              <View style={[styles.button2, styles.buttonBorder]}>
                <Text style={[styles.logInDarkButton, styles.buttonTypo]}>
                  Kayıt Ol
                </Text>
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputField}>
              <Text style={[styles.email, styles.emailTypo]}>Email</Text>
              <View style={[styles.input, styles.inputFlexBox]}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ornek@eposta.com"
                  placeholderTextColor={palette.paleBorder}
                  style={styles.textInput}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>
            {/* Password */}
            <View style={styles.inputField}>
              <Text style={[styles.email, styles.emailTypo]}>Password</Text>
              <View style={[styles.input, styles.inputFlexBox]}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Şifre"
                  placeholderTextColor={palette.paleBorder}
                  style={styles.textInput}
                  secureTextEntry
                />
              </View>
            </View>
            {/* Confirm Password (not in original design; added for registration) */}
            <View style={styles.inputField}>
              <Text style={[styles.email, styles.emailTypo]}>
                Confirm Password
              </Text>
              <View style={[styles.input, styles.inputFlexBox]}>
                <TextInput
                  value={confirm}
                  onChangeText={setConfirm}
                  placeholder="Şifre Tekrar"
                  placeholderTextColor={palette.paleBorder}
                  style={styles.textInput}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Terms acceptance */}
            <Pressable
              style={styles.checkboxField}
              onPress={() => setAccepted((a) => !a)}
            >
              <View
                style={[styles.checkboxAndLabel, styles.descriptionRowFlexBox]}
              >
                <View
                  style={[styles.checkbox, accepted && styles.checkboxChecked]}
                >
                  {accepted && (
                    <MaterialIcons name="check" size={18} color="#030852" />
                  )}
                </View>
                <Text style={[styles.iAcceptThe, styles.emailTypo]}>
                  Şartlar ve Koşulları kabul ediyorum
                </Text>
              </View>
            </Pressable>

            {error ? (
              <View style={styles.errorBox}>
                <MaterialIcons name="error" size={22} color="#ff6b6b" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Bottom submit button (mirrors second group in design) */}
            <Pressable
              style={[styles.submitBtn, disabled && styles.disabledBtn]}
              disabled={disabled}
              onPress={submit}
            >
              <Text style={[styles.submitText, styles.buttonTypo]}>
                {loading ? "Kaydediliyor..." : "Kayıt Ol"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logInDark: { flex: 1, backgroundColor: palette.bg },
  // Large canvas height (design uses absolute positioning)
  view: { width: "100%", height: 1912, flex: 1 },
  asistannzaMerhabaDeyinParent: {
    marginTop: -475,
    left: 129,
    height: 1180, // a little longer to fit confirm field
    width: 622,
    top: "50%",
    position: "absolute",
  },
  asistannzaMerhabaDeyin: {
    fontSize: 72,
    width: 621,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: palette.lightBg,
  },
  formRegister: {
    marginTop: 40,
    shadowColor: "rgba(255, 255, 255, 0.4)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 22.4,
    elevation: 22.4,
    backgroundColor: palette.bg,
    borderColor: palette.paleBorder,
    padding: 48,
    gap: 32,
    minWidth: 622,
    borderWidth: 1.9,
    borderRadius: 15,
  },
  buttonGroupFlexBox: { gap: 20, flexDirection: "row" },
  buttonSpaceBlock: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    flex: 1,
  },
  buttonTypo: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  buttonGroupLayout: {
    height: 72,
    borderRightWidth: 4,
    width: 4,
    borderStyle: "solid",
  },
  buttonBorder: {
    backgroundColor: palette.lightBg,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    alignItems: "center",
    borderStyle: "solid",
  },
  buttonGroup: { alignItems: "center", alignSelf: "stretch" },
  buttonDark: {
    justifyContent: "center",
    backgroundColor: palette.accent,
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
  },
  button: { color: "#fff" },
  buttonGroupChild: { borderColor: palette.inputBorder },
  button2: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    flex: 1,
  },
  logInDarkButton: { color: palette.bg },
  inputField: { gap: 15, alignSelf: "stretch" },
  email: {
    lineHeight: 43,
    fontSize: 31,
    fontFamily: "Inter-Regular",
    color: palette.lightBg,
  },
  emailTypo: { textAlign: "left", fontFamily: "Inter-Regular", fontSize: 31 },
  inputFlexBox: { alignItems: "center", alignSelf: "stretch" },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 31,
    paddingVertical: 23,
    minWidth: 466,
    borderColor: palette.inputBorder,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.9,
    borderRadius: 15,
  },
  textInput: { flex: 1, fontSize: 31, color: palette.bg, padding: 0 },
  checkboxField: { alignSelf: "stretch" },
  checkboxAndLabel: {
    alignSelf: "stretch",
    flexDirection: "row",
    gap: 23,
    alignItems: "center",
  },
  descriptionRowFlexBox: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 31,
    height: 31,
    borderRadius: 7,
    backgroundColor: palette.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: { backgroundColor: palette.accent },
  iAcceptThe: { lineHeight: 43, fontSize: 31, color: palette.lightBg, flex: 1 },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#402020",
    padding: 16,
    borderRadius: 12,
  },
  errorText: { color: "#ff6b6b", fontSize: 18, flex: 1 },
  submitBtn: {
    paddingVertical: 18,
    backgroundColor: palette.lightBg,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.border,
  },
  submitText: { color: palette.bg },
  disabledBtn: { opacity: 0.5 },
});

export default RegisterDark;
