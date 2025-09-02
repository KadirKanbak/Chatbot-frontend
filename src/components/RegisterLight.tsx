import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import { validateEmail, validatePassword } from "@/utils/validation";

type Nav = NativeStackNavigationProp<RootStackParamList, "SignUp">;

const RegisterLight: React.FC = () => {
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
      await new Promise((r) => setTimeout(r, 1000));
      navigation.navigate("Home");
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || !email || !password || !confirm || !accepted;

  return (
    <SafeAreaView style={styles.registerLight}>
      <View style={styles.view}>
        <View style={styles.asistannzaMerhabaDeyinParent}>
          <Text
            style={styles.asistannzaMerhabaDeyin}
          >{`Asistanınıza\n“Merhaba” deyin!`}</Text>
          <View style={[styles.formRegister, styles.inputBorder]}>
            <View style={[styles.buttonGroup, styles.buttonGroupFlexBox]}>
              <Pressable
                style={[styles.buttonLight, styles.buttonBorder]}
                onPress={() => navigation.replace("Login")}
              >
                <Text style={[styles.button, styles.buttonTypo]}>
                  Giriş Yap
                </Text>
              </Pressable>
              <View style={styles.buttonGroupLayout} />
              <View style={[styles.button2, styles.button2FlexBox]}>
                <Text style={[styles.registerLightButton, styles.buttonTypo]}>
                  Kayıt Ol
                </Text>
              </View>
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
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
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
            </View>
            <View style={styles.inputField}>
              <Text style={styles.email}>Confirm Password</Text>
              <View style={[styles.input, styles.inputFlexBox]}>
                <TextInput
                  value={confirm}
                  onChangeText={setConfirm}
                  placeholder="Şifre Tekrar"
                  placeholderTextColor="#adc6ff"
                  style={styles.textInput}
                  secureTextEntry
                />
              </View>
            </View>
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
                    <MaterialIcons name="check" size={20} color="#fff" />
                  )}
                </View>
                <Text style={styles.iAcceptThe}>
                  Şartlar ve Koşulları kabul ediyorum
                </Text>
              </View>
            </Pressable>
            {error ? (
              <View style={styles.errorBox}>
                <MaterialIcons name="error" size={22} color="#d32f2f" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            <Pressable
              style={[
                styles.button2,
                styles.button2FlexBox,
                disabled && styles.disabledBtn,
              ]}
              disabled={disabled}
              onPress={submit}
            >
              <Text style={[styles.registerLightButton, styles.buttonTypo]}>
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
  registerLight: { flex: 1, backgroundColor: "#f0f5ff" },
  // Absolute positioning is used in the design; parent view height is large to handle potential overflow on smaller screens.
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
    color: "#030852",
  },
  formRegister: {
    position: "absolute",
    top: "50%",
    marginTop: -250.45,
    width: 622,
    minWidth: 622,
    backgroundColor: "#f0f5ff",
    padding: 48,
    gap: 32,
    borderRadius: 15,
    borderColor: "#adc6ff",
    borderWidth: 1.9,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 22.4,
    elevation: 22.4,
  },
  inputBorder: {},
  buttonGroup: { alignItems: "center", alignSelf: "stretch" },
  buttonGroupFlexBox: { flexDirection: "row", gap: 20 },
  buttonBorder: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: "#2f54eb",
    borderRadius: 20,
  },
  buttonTypo: { fontSize: 32, textAlign: "center", fontWeight: "600" },
  buttonLight: {
    backgroundColor: "#f0f5ff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  // Separate text style only for the button label color
  button: { color: "#030852" },
  button2: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: "#2f54eb",
    borderRadius: 20,
  },
  button2FlexBox: {
    backgroundColor: "#10239e",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  registerLightButton: { color: "#fff" },
  buttonGroupLayout: {
    height: 72,
    width: 4,
    borderRightWidth: 4,
    borderColor: "#061178",
  },
  inputField: { gap: 15, alignSelf: "stretch" },
  email: { lineHeight: 43, fontSize: 31, color: "#030852" },
  input: {
    backgroundColor: "#fff",
    borderColor: "#d6e4ff",
    paddingHorizontal: 31,
    paddingVertical: 23,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.9,
    borderRadius: 15,
  },
  textInput: { flex: 1, fontSize: 31, color: "#030852", padding: 0 },
  checkboxField: { alignSelf: "stretch" },
  checkboxAndLabel: {
    alignSelf: "stretch",
    flexDirection: "row",
    gap: 23,
    alignItems: "center",
  },
  // Placeholder styles retained to keep compatibility with references from an older version
  inputFlexBox: { alignItems: "center", alignSelf: "stretch" },
  descriptionRowFlexBox: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    height: 31,
    width: 31,
    borderRadius: 7,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#10239e",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: { backgroundColor: "#10239e" },
  iAcceptThe: { lineHeight: 43, fontSize: 31, color: "#030852", flex: 1 },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#ffecec",
    padding: 16,
    borderRadius: 12,
    alignSelf: "stretch",
  },
  errorText: { color: "#d32f2f", fontSize: 18, flex: 1 },
  disabledBtn: { opacity: 0.5 },
});

export default RegisterLight;
