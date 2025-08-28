// HomeScreen temiz sürüm
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  StatusBar,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { MaterialIcons } from "@expo/vector-icons";
import ChatListItem from "../components/ChatListItem";
import { SAMPLE_CHATS } from "../data/sampleData";
import { Chat } from "../types/chat";
import { useTheme } from "../styles/ThemeContext";
import { metrics, normalize } from "../utils/metrics";
import { LinearGradient } from "expo-linear-gradient";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme, themeType } = useTheme();
  const [search, setSearch] = useState("");

  const filteredChats = useMemo(
    () =>
      SAMPLE_CHATS.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const handleChatPress = (chat: Chat) => {
    navigation.navigate("ChatDetails", { chatId: chat.id });
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <ChatListItem
      chat={item}
      onPress={() => handleChatPress(item)}
      variant={
        theme.colors.background === "#1F2140" ? "historyDark" : undefined
      }
    />
  );

  // CHATHISTORYLight tasarımına uyarlanmış görünüm
  const cardBg =
    themeType === "dark" ? theme.colors.brand.bg : "rgba(255,255,255,0.95)";
  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={themeType === "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primary]}
          style={styles.header}
        >
          <Text
            style={[styles.headerTitle, { color: theme.colors.text.inverse }]}
          >
            Sohbet Geçmişi
          </Text>
        </LinearGradient>
        <View style={styles.body}>
          <View
            style={[
              styles.card,
              { backgroundColor: cardBg, borderColor: theme.colors.border },
            ]}
          >
            <View
              style={[
                styles.searchRow,
                {
                  backgroundColor:
                    themeType === "dark"
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(0,0,0,0.04)",
                },
              ]}
            >
              <MaterialIcons
                name="search"
                size={normalize(20)}
                color={theme.colors.text.secondary}
              />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Sohbetlerde ara..."
                placeholderTextColor={theme.colors.text.secondary}
                style={[
                  styles.searchInput,
                  { color: theme.colors.text.primary },
                ]}
                autoCorrect={false}
                returnKeyType="search"
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <MaterialIcons
                    name="close"
                    size={normalize(18)}
                    color={theme.colors.text.secondary}
                  />
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={filteredChats}
              keyExtractor={(i) => i.id}
              renderItem={renderChatItem}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => (
                <View style={{ height: metrics.padding.small }} />
              )}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                filteredChats.length > 0 ? (
                  <Text
                    style={[
                      styles.countText,
                      { color: theme.colors.text.secondary },
                    ]}
                  >
                    {filteredChats.length} sohbet
                  </Text>
                ) : null
              }
              ListEmptyComponent={() => (
                <View style={styles.emptyWrap}>
                  <MaterialIcons
                    name="inbox"
                    size={normalize(48)}
                    color={theme.colors.text.secondary}
                    style={{ opacity: 0.3 }}
                  />
                  <Text
                    style={{
                      marginTop: metrics.padding.medium,
                      color: theme.colors.text.secondary,
                      fontSize: normalize(14),
                    }}
                  >
                    Kayıtlı sohbet yok.
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatDetails", { chatId: "new" })}
          style={[
            styles.fab,
            { backgroundColor: theme.colors.primary, shadowColor: "#000" },
          ]}
          activeOpacity={0.85}
        >
          <MaterialIcons
            name="add"
            size={normalize(28)}
            color={theme.colors.text.inverse}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  body: { flex: 1, padding: metrics.padding.large },
  header: {
    justifyContent: "center",
    paddingHorizontal: metrics.padding.large,
    paddingTop:
      Platform.OS === "ios"
        ? metrics.padding.xlarge * 1.3
        : metrics.padding.large,
    paddingBottom: metrics.padding.small,
    position: "relative",
    overflow: "hidden",
  },
  headerTitle: {
    fontSize: normalize(24),
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  card: {
    flex: 1,
    borderRadius: metrics.borderRadius.large,
    padding: metrics.padding.medium,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 22,
        shadowOffset: { width: 0, height: 12 },
      },
      android: { elevation: 10 },
    }),
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(127,127,127,0.08)",
    borderRadius: 14,
    paddingHorizontal: metrics.padding.medium,
    paddingVertical: metrics.padding.small - 2,
    marginBottom: metrics.padding.medium,
    // icon ile input arası boşluk
    columnGap: metrics.padding.small,
  },
  searchInput: { flex: 1, fontSize: normalize(14) },
  emptyWrap: {
    alignItems: "center",
    paddingVertical: metrics.padding.large * 1.5,
  },
  fab: {
    position: "absolute",
    right: metrics.padding.large,
    bottom: metrics.padding.large,
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowOpacity: 0.3,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 12 },
    }),
  },
  listContent: {
    paddingBottom: metrics.padding.large,
  },
  countText: {
    fontSize: normalize(12),
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: metrics.padding.small,
  },
});

export default HomeScreen;
