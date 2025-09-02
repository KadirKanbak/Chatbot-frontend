import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import { validateEmail } from "@/utils/validation";
import { MaterialIcons } from "@expo/vector-icons";

type Nav = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginLight: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    try {
      if (!email) throw new Error("Email gerekli");
      if (!validateEmail(email)) throw new Error("Geçersiz email");
      if (!password) throw new Error("Şifre gerekli");
      setLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      navigation.navigate("Home");
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || !email || !password;

  return (
    <SafeAreaView style={styles.logInLight}>
      <View style={styles.view}>
        <View style={styles.asistannzaMerhabaDeyinParent}>
          <Text
            style={styles.asistannzaMerhabaDeyin}
          >{`Asistanınıza\n“Merhaba” deyin!`}</Text>
          <View style={[styles.formRegister, styles.inputBorder]}>
            <View style={[styles.buttonGroup, styles.buttonGroupFlexBox]}>
              <View style={[styles.buttonLight, styles.buttonFlexBox]}>
                <Text style={[styles.button, styles.buttonTypo]}>
                  Giriş Yap
                </Text>
              </View>
              <View style={styles.buttonGroupLayout} />
              <Pressable
                style={[styles.logInLightButtonLight, styles.buttonFlexBox]}
                onPress={() => navigation.replace("SignUp")}
              >
                <Text style={[styles.logInLightButton, styles.buttonTypo]}>
                  Kayıt Ol
                </Text>
              </Pressable>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.email}>Email</Text>
              <View style={[styles.input, styles.inputFlexBox]}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="ornek@eposta.com"
                  placeholderTextColor="#adc6ff"
                  style={styles.textInput}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              {error && error.toLowerCase().includes("email") && (
                <Text style={styles.inlineError}>{error}</Text>
              )}
            </View>
            <View style={styles.inputField}>
              <Text style={styles.email}>Password</Text>
              <View style={[styles.input, styles.inputFlexBox]}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Şifre"
                  placeholderTextColor="#adc6ff"
                  style={styles.textInput}
                  secureTextEntry
                />
              </View>
              {error && error.toLowerCase().includes("şifre") && (
                <Text style={styles.inlineError}>{error}</Text>
              )}
            </View>
            {error &&
            !error.toLowerCase().includes("şifre") &&
            !error.toLowerCase().includes("email") ? (
              <View style={styles.errorBox}>
                <MaterialIcons name="error" size={22} color="#d32f2f" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            {/* Bottom action button group (design: logInLightButtonGroup) */}
            <View
              style={[styles.logInLightButtonGroup, styles.buttonGroupFlexBox]}
            >
              {/* Hidden / placeholder elements reserved in design */}
              <View style={[styles.buttonLight2, styles.hiddenPlaceholder]} />
              <View
                style={[styles.buttonGroupItem, styles.hiddenPlaceholder]}
              />
              <Pressable
                style={[
                  styles.buttonLight,
                  styles.buttonFlexBox,
                  disabled && styles.disabledBtn,
                ]}
                disabled={disabled}
                onPress={submit}
              >
                <Text style={[styles.button, styles.buttonTypo]}>
                  {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logInLight: { flex: 1, backgroundColor: "#f0f5ff" },
  view: { width: "100%", height: 1912, flex: 1 },
  asistannzaMerhabaDeyinParent: {
    marginTop: -421,
    left: 129,
    height: 842,
    width: 622,
    top: "50%",
    position: "absolute",
  },
  asistannzaMerhabaDeyin: {
    fontSize: 72,
    width: 621,
    textAlign: "center",
    fontWeight: "600",
    color: "#030852",
  },
  formRegister: {
    marginTop: -187.2,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 22.4,
    shadowOpacity: 1,
    elevation: 22.4,
    borderColor: "#adc6ff",
    padding: 48,
    gap: 32,
    minWidth: 622,
    backgroundColor: "#f0f5ff",
    borderRadius: 15,
    width: 622,
    top: "50%",
    position: "absolute",
  },
  inputBorder: { borderWidth: 1.9, borderRadius: 15 },
  buttonGroup: { alignItems: "center", alignSelf: "stretch" },
  buttonGroupFlexBox: { gap: 20, flexDirection: "row" },
  buttonFlexBox: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2f54eb",
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  buttonGroupLayout: {
    height: 72,
    borderRightWidth: 4,
    borderColor: "#061178",
    width: 4,
  },
  buttonLight: { backgroundColor: "#10239e" },
  button: { color: "#fff" },
  buttonTypo: { fontSize: 32, textAlign: "center", fontWeight: "600" },
  logInLightButtonLight: { backgroundColor: "#f0f5ff" },
  logInLightButton: { color: "#030852", fontSize: 32 },
  inputField: { gap: 15, alignSelf: "stretch" },
  email: { lineHeight: 43, textAlign: "left", fontSize: 31, color: "#030852" },
  input: {
    backgroundColor: "#fff",
    borderColor: "#d6e4ff",
    paddingHorizontal: 31,
    paddingVertical: 23,
    minWidth: 466.5,
    flexDirection: "row",
    borderWidth: 1.9,
    borderRadius: 15,
    alignItems: "center",
  },
  textInput: { flex: 1, fontSize: 31, color: "#030852", padding: 0 },
  inputFlexBox: { alignItems: "center", alignSelf: "stretch" },
  inlineError: { marginTop: 8, color: "#d32f2f", fontSize: 16 },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffecec",
    padding: 16,
    borderRadius: 12,
  },
  errorText: { color: "#d32f2f", fontSize: 18, flex: 1 },
  disabledBtn: { opacity: 0.5 },
  // Newly added bottom group and placeholder styles
  logInLightButtonGroup: { height: 71, width: 526, alignSelf: "center" },
  buttonLight2: {
    width: 245,
    height: 73,
    borderWidth: 1,
    borderColor: "#2f54eb",
    borderRadius: 20,
    backgroundColor: "#f0f5ff",
  },
  buttonGroupItem: {
    width: 4,
    height: 72,
    borderRightWidth: 4,
    borderColor: "#061178",
  },
  hiddenPlaceholder: { display: "none" },
});

export default LoginLight;
