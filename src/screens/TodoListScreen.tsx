import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { TodoItem, TodoSummary } from "../types/todo";
import { SAMPLE_TODOS } from "../data/todoData";
import TodoListItem from "../components/TodoListItem";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../styles/ThemeContext";
import { metrics, normalize } from "../utils/metrics";

type Nav = NativeStackNavigationProp<RootStackParamList, "TodoList">;

export default function TodoListScreen() {
  const navigation = useNavigation<Nav>();

  // Özet istatistiklerini hesapla
  const summary: TodoSummary = useMemo(() => {
    return SAMPLE_TODOS.reduce(
      (acc, todo) => ({
        total: acc.total + 1,
        completed: acc.completed + (todo.status === "completed" ? 1 : 0),
        pending: acc.pending + (todo.status === "pending" ? 1 : 0),
        highPriority: acc.highPriority + (todo.priority === "high" ? 1 : 0),
      }),
      {
        total: 0,
        completed: 0,
        pending: 0,
        highPriority: 0,
      }
    );
  }, []);

  const renderSummaryItem = (label: string, value: number, color: string) => (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={[styles.summaryLabel, { color }]}>{label}</Text>
    </View>
  );

  const handleItemPress = (item: TodoItem) => {
    navigation.navigate("TodoDetails", { todoId: item.id });
  };

  const { theme, themeType } = useTheme();

  const cardBg =
    themeType === "dark" ? theme.colors.brand.bg : "rgba(255,255,255,0.95)";
  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={themeType === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text
          style={[styles.headerTitle, { color: theme.colors.text.inverse }]}
        >
          Görevlerim
        </Text>
      </View>
      <View style={styles.body}>
        <View
          style={[
            styles.card,
            { backgroundColor: cardBg, borderColor: theme.colors.border },
          ]}
        >
          <View style={styles.summaryRow}>
            {renderSummaryItem(
              "Toplam",
              summary.total,
              theme.colors.text.primary
            )}
            {renderSummaryItem(
              "Tamamlanan",
              summary.completed,
              theme.colors.success
            )}
            {renderSummaryItem(
              "Bekleyen",
              summary.pending,
              theme.colors.accent
            )}
            {renderSummaryItem(
              "Yüksek",
              summary.highPriority,
              theme.colors.error
            )}
          </View>
          <FlatList<TodoItem>
            data={SAMPLE_TODOS}
            renderItem={({ item }) => (
              <TodoListItem item={item} onPress={handleItemPress} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: metrics.padding.large,
    paddingTop: normalize(12),
    paddingBottom: metrics.padding.medium,
  },
  headerTitle: { flex: 1, fontSize: normalize(28), fontWeight: "600" },
  body: {
    flex: 1,
    paddingHorizontal: metrics.padding.large,
    paddingTop: metrics.padding.large,
  },
  card: {
    flex: 1,
    borderRadius: metrics.borderRadius.xlarge,
    borderWidth: 1,
    padding: metrics.padding.medium,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 6 },
    }),
  },
  summaryRow: { flexDirection: "row", marginBottom: metrics.padding.medium },
  summaryItem: { flex: 1, alignItems: "center" },
  summaryValue: { fontSize: normalize(18), fontWeight: "700", marginBottom: 2 },
  summaryLabel: { fontSize: normalize(11), fontWeight: "600", opacity: 0.7 },
  listContent: { paddingBottom: metrics.padding.large },
});
