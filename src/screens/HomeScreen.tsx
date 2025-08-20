import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import ChatListItem from "../components/ChatListItem";
import { SAMPLE_CHATS } from "../data/sampleData";
import { Chat } from "../types/chat";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleChatPress = (chat: Chat) => {
    navigation.navigate("ChatDetails", { chatId: chat.id });
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <ChatListItem chat={item} onPress={() => handleChatPress(item)} />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Ionicons name="sparkles-outline" size={16} color="#007AFF" />
          </View>
          <Text style={styles.headerBrand}>Mobile ChatBot</Text>
          <View style={{ flex: 1 }} />
          <View style={styles.iconSeparator} />
          <Ionicons name="chatbubbles" size={22} color="#007AFF" />
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Tekrar Hoşgeldiniz!</Text>
          <Text style={styles.welcomeSubtitle}>
            AI destekli chatbot ile sohbet etmeye başlayın
          </Text>

          <TouchableOpacity
            style={styles.newChatButton}
            onPress={() =>
              navigation.navigate("ChatDetails", { chatId: "new" })
            }
            activeOpacity={0.9}
          >
            <Ionicons name="add-circle-outline" size={22} color="#FFFFFF" />
            <Text style={styles.newChatText}>Yeni Sohbet</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentChats}>
          <Text style={styles.recentTitle}>Son Sohbetler</Text>
          <FlatList
            data={SAMPLE_CHATS}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 12 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  logoBox: {
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#E3F2FD",
  },
  headerBrand: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  iconSeparator: {
    width: 1,
    height: 24,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 12,
  },
  welcomeSection: {
    padding: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 24,
  },
  newChatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  newChatText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  recentChats: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
});

export default HomeScreen;
