import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import { validateEmail } from "@/utils/validation";
import { MaterialIcons } from "@expo/vector-icons";

type Nav = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginDark: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Statik tasarımda şart/checkbox alanı yok; login için onay gereksiz.
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
    <SafeAreaView style={styles.logInDark}>
      <View style={styles.view}>
        <View style={styles.asistannzaMerhabaDeyinParent}>
          <Text
            style={styles.asistannzaMerhabaDeyin}
          >{`Asistanınıza\n“Merhaba” deyin!`}</Text>
          <View style={styles.formRegister}>
            {/* Üst sekme grup (statik tasarım) */}
            <View style={[styles.buttonGroup, styles.buttonGroupFlexBox]}>
              <View style={[styles.buttonDark, styles.buttonBorder]}>
                <Text style={[styles.tabActiveText, styles.buttonTypo]}>
                  Giriş Yap
                </Text>
              </View>
              <View
                style={[styles.buttonGroupChild, styles.buttonGroupLayout]}
              />
              <Pressable
                style={[styles.button2, styles.button2FlexBox]}
                onPress={() => navigation.replace("SignUp")}
              >
                <Text style={[styles.logInDarkButton, styles.buttonTypo]}>
                  Kayıt Ol
                </Text>
              </Pressable>
            </View>
            {/* Email */}
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
            </View>
            {/* Password */}
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
            </View>
            {error ? (
              <View style={styles.errorBox}>
                <MaterialIcons name="error" size={22} color="#ff6b6b" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            {/* Alt buton grup (tasarım: logInDarkButtonGroup) */}
            <View
              style={[styles.logInDarkButtonGroup, styles.buttonGroupFlexBox]}
            >
              <View style={[styles.buttonLightHidden]} />
              <View style={[styles.buttonGroupItemHidden]} />
              <Pressable
                style={[
                  styles.buttonDark,
                  styles.buttonBorder,
                  disabled && styles.disabledBtn,
                ]}
                disabled={disabled}
                onPress={submit}
              >
                <Text style={[styles.tabActiveText, styles.buttonTypo]}>
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
  logInDark: { flex: 1, backgroundColor: "#030852" },
  view: { width: "100%", height: 1912, flex: 1 },
  asistannzaMerhabaDeyinParent: {
    position: "absolute",
    top: "50%",
    marginTop: -475,
    left: 129,
    width: 622,
    height: 956,
  },
  asistannzaMerhabaDeyin: {
    fontSize: 72,
    width: 621,
    textAlign: "center",
    fontWeight: "600",
    color: "#f0f5ff",
  },
  formRegister: {
    position: "absolute",
    top: "50%",
    marginTop: -250.45,
    width: 622,
    minWidth: 622,
    backgroundColor: "#030852",
    padding: 48,
    gap: 32,
    borderRadius: 15,
    borderColor: "#adc6ff",
    borderWidth: 1.9,
    shadowColor: "rgba(255,255,255,0.4)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 22.4,
    elevation: 22.4,
  },
  buttonGroup: { alignItems: "center", alignSelf: "stretch" },
  buttonGroupFlexBox: { gap: 20, flexDirection: "row" },
  buttonSpaceBlock: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    flex: 1,
  },
  buttonTypo: { fontSize: 32, textAlign: "center", fontWeight: "600" },
  buttonDark: {
    justifyContent: "center",
    backgroundColor: "#f0f5ff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2f54eb",
    borderRadius: 20,
    paddingHorizontal: 32,
    flexDirection: "row",
  },
  tabActiveText: { color: "#030852" },
  buttonGroupChild: { borderColor: "#d6e4ff" },
  buttonGroupLayout: {
    height: 72,
    width: 4,
    borderRightWidth: 4,
    borderColor: "#d6e4ff",
  },
  button2: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderColor: "#2f54eb",
    borderRadius: 20,
  },
  button2FlexBox: {
    backgroundColor: "#85a5ff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonBorder: { borderStyle: "solid" },
  button: { color: "#030852" },
  logInDarkButton: { color: "#fff" },
  inputField: { gap: 15, alignSelf: "stretch" },
  email: { lineHeight: 43, fontSize: 31, color: "#f0f5ff" },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 31,
    paddingVertical: 23,
    minWidth: 466.5,
    borderColor: "#d6e4ff",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.9,
    borderRadius: 15,
  },
  textInput: { flex: 1, fontSize: 31, color: "#030852", padding: 0 },
  inputFlexBox: { alignItems: "center", alignSelf: "stretch" },
  // Checkbox alanı tasarımda yok: eski stiller kaldırıldı
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#402020",
    padding: 16,
    borderRadius: 12,
    alignSelf: "stretch",
  },
  errorText: { color: "#ff6b6b", fontSize: 18, flex: 1 },
  disabledBtn: { opacity: 0.5 },
  logInDarkButtonGroup: { height: 71, width: 526, alignSelf: "center" },
  buttonLightHidden: { width: 245, height: 73, display: "none" },
  buttonGroupItemHidden: { display: "none" },
});

export default LoginDark;
