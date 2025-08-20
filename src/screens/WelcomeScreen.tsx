import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ColorValue,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../styles/ThemeContext";

type Nav = NativeStackNavigationProp<RootStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const navigation = useNavigation<Nav>();
  const { theme, themeType } = useTheme();

  const staticStyles = StyleSheet.create({
    gradient: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 50 : 30,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: "space-between",
    },
    header: {
      alignItems: "center",
      marginTop: 40,
    },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "rgba(255,255,255,0.15)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
    },
    centerBlock: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    featureRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    featureIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255,255,255,0.1)",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    actions: {
      marginTop: 40,
      gap: 16,
      width: "100%",
      paddingBottom: 32,
    },
    primaryBtn: {
      padding: 18,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    moreBtn: {
      padding: 18,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    cornerGlow: {
      position: "absolute",
      right: -40,
      top: -20,
      width: 280,
      height: 160,
      borderRadius: 140,
      opacity: 0.9,
    },
  });

  const dynamicStyles = StyleSheet.create({
    headline: {
      fontSize: 36,
      fontWeight: "800",
      color: theme.colors.text.primary,
      textAlign: "center",
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    sub: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      textAlign: "center",
      marginBottom: 32,
      lineHeight: 22,
    },
    featureText: {
      fontSize: 16,
      color: theme.colors.text.primary,
      fontWeight: "600",
    },
    featureSubText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginTop: 2,
    },
    primaryBtn: {
      backgroundColor: theme.colors.primary,
    },
    primaryText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: "700",
      marginRight: 8,
    },
    moreText: {
      color: theme.colors.text.primary,
      fontSize: 16,
      fontWeight: "600",
      marginRight: 8,
    },
  });

  const gradientColors: readonly [ColorValue, ColorValue, ColorValue] =
    themeType === "light"
      ? ["#F0F5FF", "#D6E4FF", "#ADC6FF"]
      : ["#1F2140", "#2C2E47", "#3A3D66"];

  return (
    <>
      <StatusBar
        barStyle={themeType === "light" ? "dark-content" : "light-content"}
      />
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={staticStyles.gradient}
      >
        <View style={staticStyles.content}>
          <View style={staticStyles.header}>
            <View style={staticStyles.logoContainer}>
              <Ionicons
                name="chatbubbles"
                size={40}
                color={theme.colors.primary}
              />
            </View>
            <Text style={dynamicStyles.headline}>
              Mobil Sohbet{"\n"}Asistanı
            </Text>
            <Text style={dynamicStyles.sub}>
              Yapay zeka destekli sohbet asistanı ile{"\n"}
              iletişimi yeni seviyeye taşıyın
            </Text>
          </View>

          <View style={staticStyles.centerBlock}>
            <View style={staticStyles.featureRow}>
              <View style={staticStyles.featureIcon}>
                <Ionicons name="flash" size={24} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={dynamicStyles.featureText}>Hızlı Yanıtlar</Text>
                <Text style={dynamicStyles.featureSubText}>
                  Anında akıllı cevaplar alın
                </Text>
              </View>
            </View>

            <View style={staticStyles.featureRow}>
              <View style={staticStyles.featureIcon}>
                <Ionicons
                  name="shield-checkmark"
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
              <View>
                <Text style={dynamicStyles.featureText}>Güvenli İletişim</Text>
                <Text style={dynamicStyles.featureSubText}>
                  Uçtan uca şifreli mesajlaşma
                </Text>
              </View>
            </View>

            <View style={staticStyles.featureRow}>
              <View style={staticStyles.featureIcon}>
                <Ionicons
                  name="cloud-done"
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
              <View>
                <Text style={dynamicStyles.featureText}>
                  Kesintisiz Deneyim
                </Text>
                <Text style={dynamicStyles.featureSubText}>
                  Her cihazda senkronize çalışır
                </Text>
              </View>
            </View>
          </View>

          <View style={staticStyles.actions}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("SignUp")}
              style={[staticStyles.primaryBtn, dynamicStyles.primaryBtn]}
            >
              <Text style={dynamicStyles.primaryText}>Hemen Başla</Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color={theme.colors.text.inverse}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={staticStyles.moreBtn}
              activeOpacity={0.8}
            >
              <Text style={dynamicStyles.moreText}>Hesabın var mı?</Text>
              <Ionicons
                name="log-in-outline"
                size={20}
                color={theme.colors.text.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Corner decoration */}
        <LinearGradient
          colors={["rgba(255,255,255,0.3)", "transparent"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.5, y: 0.7 }}
          style={staticStyles.cornerGlow}
        />
      </LinearGradient>
    </>
  );
}
