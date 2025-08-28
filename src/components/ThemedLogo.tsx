import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated, ImageStyle } from "react-native";
import { useTheme } from "@/styles/ThemeContext";
import { normalize } from "@/utils/metrics";
import { Asset } from "expo-asset";

// Her iki logoyu aynı anda (opacity ile) tutarak tema değişiminde bekleme / flicker azaltılır.
// İlk kullanımda her iki varlık da önceden indirilir (Asset.downloadAsync) -> cache.

const lightLogo = require("../../assets/logo-light.png");
const darkLogo = require("../../assets/logo-dark.png");

interface ThemedLogoProps {
  size?: number; // normalize edilmemiş değer (component içinde normalize edilir)
  style?: ImageStyle | ImageStyle[];
  fadeDurationMs?: number;
}

const ThemedLogo: React.FC<ThemedLogoProps> = ({
  size = 160,
  style,
  fadeDurationMs = 220,
}) => {
  const { themeType } = useTheme();
  const lightOpacity = useRef(
    new Animated.Value(themeType === "light" ? 1 : 0)
  ).current;
  const darkOpacity = useRef(
    new Animated.Value(themeType === "dark" ? 1 : 0)
  ).current;

  // Logoları preload et
  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          Asset.fromModule(lightLogo).downloadAsync(),
          Asset.fromModule(darkLogo).downloadAsync(),
        ]);
      } catch (e) {
        // Sessiz geç; cache yoksa RN yine require'dan okuyacak
      }
    })();
  }, []);

  // Tema değişiminde cross-fade animasyonu
  useEffect(() => {
    Animated.parallel([
      Animated.timing(lightOpacity, {
        toValue: themeType === "light" ? 1 : 0,
        duration: fadeDurationMs,
        useNativeDriver: true,
      }),
      Animated.timing(darkOpacity, {
        toValue: themeType === "dark" ? 1 : 0,
        duration: fadeDurationMs,
        useNativeDriver: true,
      }),
    ]).start();
  }, [themeType, fadeDurationMs, lightOpacity, darkOpacity]);

  const dim = normalize(size);

  return (
    <View style={[styles.wrap, { width: dim, height: dim }]}>
      <Animated.Image
        source={lightLogo}
        resizeMode="contain"
        style={[
          styles.img,
          { opacity: lightOpacity },
          style,
          { width: dim, height: dim },
        ]}
        fadeDuration={0}
      />
      <Animated.Image
        source={darkLogo}
        resizeMode="contain"
        style={[
          styles.img,
          { opacity: darkOpacity },
          style,
          { width: dim, height: dim, position: "absolute", top: 0, left: 0 },
        ]}
        fadeDuration={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
});

export default ThemedLogo;
