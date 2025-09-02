import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThemedLogo from "@/components/ThemedLogo";
import { useTheme } from "@/styles/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { metrics, normalize } from "@/utils/metrics";

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { ...StyleSheet.absoluteFillObject },
  scrollArea: {
    flex: 1,
    justifyContent: "center", // <-- Dikey ortalama
    paddingTop:
      Platform.OS === "ios"
        ? metrics.padding.xlarge
        : ((StatusBar.currentHeight || metrics.padding.large) + metrics.padding.large),
    paddingBottom:
      Platform.OS === "ios"
        ? metrics.padding.xlarge
        : metrics.padding.large * 2,
    paddingHorizontal: metrics.padding.xlarge,
  },
  hero: { alignItems: "center", marginBottom: metrics.padding.xlarge },
  logoWrap: {
    width: normalize(104),
    height: normalize(104),
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoAccent: {
    position: "absolute",
    bottom: -6,
    right: -6,
    width: normalize(32),
    height: normalize(32),
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: normalize(40),
    fontWeight: "700",
    textAlign: "center",
    marginTop: metrics.padding.large,
    marginBottom: metrics.padding.small,
  },
  subtitle: {
    fontSize: normalize(16),
    lineHeight: normalize(22),
    textAlign: "center",
    maxWidth: 520,
    opacity: 0.85,
  },
  featureGrid: {
    marginTop: metrics.padding.xlarge,
    marginBottom: metrics.padding.xlarge,
    rowGap: metrics.padding.medium,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: metrics.padding.small,
  },
  featureIcon: { marginTop: 2 },
  featureTextBlock: { flex: 1 },
  featureTitle: { fontSize: normalize(15), fontWeight: "600", marginBottom: 2 },
  featureDesc: {
    fontSize: normalize(13),
    lineHeight: normalize(18),
    opacity: 0.75,
  },
  ctaGroup: { marginBottom: metrics.padding.large },
  primaryBtn: {
    height: normalize(56),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: metrics.padding.large,
    marginBottom: metrics.padding.medium,
  },
  secondaryBtn: {
    height: normalize(56),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 2,
    paddingHorizontal: metrics.padding.large,
  },
  btnText: {
    fontSize: normalize(16),
    fontWeight: "600",
    marginLeft: metrics.padding.small,
  },
  inlineActions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: metrics.padding.large,
  },
  linkText: { fontSize: normalize(14), fontWeight: "600" },
  divider: {
    width: 1,
    height: normalize(16),
    backgroundColor: "rgba(255,255,255,0.25)",
    marginHorizontal: metrics.padding.medium,
  },
  terms: {
    fontSize: normalize(11),
    lineHeight: normalize(14),
    textAlign: "center",
    opacity: 0.6,
    maxWidth: 480,
    alignSelf: "center",
  },
  themeToggle: {
    position: "absolute",
    top:
      Platform.OS === "ios"
        ? metrics.padding.large * 1.2
        : metrics.padding.large,
    right: metrics.padding.large,
    padding: metrics.padding.small,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  themeToggleText: {
    marginLeft: 6,
    fontSize: normalize(12),
    fontWeight: "600",
  },
});

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const { theme, themeType } = useTheme();

  const featureItems = [
    {
      title: "Kişisel finans takibi",
      desc: "Gelir / gider akışınızı tek ekranda görün ve eğilimleri yakalayın.",
      icon: "insights",
    },
    {
      title: "Akıllı bütçe önerileri",
      desc: "Harcamalarınıza göre dinamik bütçe limitleri ve uyarılar.",
      icon: "pie-chart-outline",
    },
    {
      title: "Gerçek zamanlı analiz",
      desc: "Anlık veri işleme ile fırsat ve risk noktalarını vurgular.",
      icon: "flash-on",
    },
  ];

  const gradientColors = (
    themeType === "dark"
      ? ["#0B0C18", "#030852", "#0B0C18"]
      : ["#D6E4FF", "#F0F5FF", "#D6E4FF"]
  ) as [string, string, string];

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} style={styles.gradient} />
      {/* Global Theme Toggle App seviyesinde gösteriliyor */}

      <View style={styles.scrollArea}>
        {/* HERO */}
        <View style={styles.hero}>
          <ThemedLogo size={160} />
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            FinPal'e Hoş Geldiniz
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.text.secondary }]}
          >
            Kişisel finans asistanınız; analiz, bütçe yönetimi ve içgörüleri tek
            yerde sunar. Verinin gücünü cebinize taşıyın.
          </Text>
        </View>
        {/* FEATURES */}
        <View style={styles.featureGrid}>
          {featureItems.map((f) => (
            <View key={f.title} style={styles.featureRow}>
              <MaterialIcons
                name={f.icon as any}
                size={normalize(26)}
                color={theme.colors.primary}
                style={styles.featureIcon}
              />
              <View style={styles.featureTextBlock}>
                <Text
                  style={[
                    styles.featureTitle,
                    { color: theme.colors.text.primary },
                  ]}
                >
                  {f.title}
                </Text>
                <Text
                  style={[
                    styles.featureDesc,
                    { color: theme.colors.text.secondary },
                  ]}
                >
                  {f.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
        {/* CTA */}
        <View style={styles.ctaGroup}>
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              {
                backgroundColor: theme.colors.primary,
                shadowColor: "#000",
                shadowOpacity: 0.18,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 5,
              },
            ]}
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.9}
          >
            <MaterialIcons
              name="login"
              size={normalize(20)}
              color={theme.colors.text.inverse}
            />
            <Text
              style={[styles.btnText, { color: theme.colors.text.inverse }]}
            >
              Giriş Yap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.secondaryBtn,
              {
                borderColor: theme.colors.primary,
                backgroundColor:
                  themeType === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.02)",
              },
            ]}
            onPress={() => navigation.navigate("SignUp")}
            activeOpacity={0.85}
          >
            <MaterialIcons
              name="person-add"
              size={normalize(20)}
              color={theme.colors.primary}
            />
            <Text style={[styles.btnText, { color: theme.colors.primary }]}>
              Hesap Oluştur
            </Text>
          </TouchableOpacity>
        </View>
        {/* Inline actions */}
        <View style={styles.inlineActions}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>
              Misafir Olarak Devam Et
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => navigation.navigate("ChatBot")}>
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>
              Demo Sohbet
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.terms, { color: theme.colors.text.secondary }]}>
          Devam ederek Hizmet Şartları ve Gizlilik Politikası'nı kabul etmiş
          olursunuz.
        </Text>
      </View>
    </View>
  );
}
