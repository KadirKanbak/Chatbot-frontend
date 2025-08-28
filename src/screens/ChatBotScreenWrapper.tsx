import React from "react";
import ChatBotScreen from "@/components/ChatBotScreen";
import { View, StatusBar } from "react-native";
import { useTheme } from "@/styles/ThemeContext";

const ChatBotScreenWrapper: React.FC = () => {
  const { theme, themeType } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={themeType === "dark" ? "light-content" : "dark-content"}
      />
      <ChatBotScreen />
    </View>
  );
};

export default ChatBotScreenWrapper;
