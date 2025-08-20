import React from "react";
import { View, StatusBar } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import ChatScreen from "../components/ChatScreen";
import { SAMPLE_CHATS } from "../data/sampleData";

type Nav = NativeStackNavigationProp<RootStackParamList, "ChatDetails">;
type RouteProps = RouteProp<RootStackParamList, "ChatDetails">;

export default function ChatDetailsScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProps>();
  const { chatId } = route.params;

  // Mevcut sohbeti bul
  const currentChat = SAMPLE_CHATS.find((chat) => chat.id === chatId);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar barStyle="dark-content" />
      <ChatScreen
        onClose={() => navigation.goBack()}
        title={currentChat?.title || "Yeni Sohbet"}
      />
    </View>
  );
}
