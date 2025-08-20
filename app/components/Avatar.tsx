import React from "react";
import { View, Text } from "react-native";

export type AvatarKind = "general" | "code" | "assistant" | "project" | "learn";

const BG: Record<AvatarKind, string> = {
  general:  "#E0EAFF", // mavi
  code:     "#EDE9FE", // mor açık
  assistant:"#DCFCE7", // yeşil
  project:  "#FDE68A", // sarı
  learn:    "#FFE4E6"  // pembe
};

const ICON: Record<AvatarKind, string> = {
  general:  "💬",
  code:     "💻",
  assistant:"🧠",
  project:  "📁",
  learn:    "📚"
};

export default function Avatar({ kind, size = 40 }: { kind: AvatarKind; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: BG[kind],
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontSize: size * 0.55 }}>{ICON[kind]}</Text>
    </View>
  );
}
