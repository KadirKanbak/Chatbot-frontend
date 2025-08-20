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

  return (
    <LinearGradient
      colors={["#F0F5FF", "#D6E4FF", "#ADC6FF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* Başlık */}
      <View style={styles.header}>
        <Text style={styles.title}>Görevlerim</Text>
        <Text style={styles.subtitle}>Proje görevlerini takip et ve yönet</Text>
      </View>

      {/* Özet Kartları */}
      <View style={styles.summaryContainer}>
        {renderSummaryItem("Toplam", summary.total, "#1F2140")}
        {renderSummaryItem("Tamamlanan", summary.completed, "#52C41A")}
        {renderSummaryItem("Bekleyen", summary.pending, "#FAAD14")}
        {renderSummaryItem("Yüksek Öncelik", summary.highPriority, "#FF4D4F")}
      </View>

      {/* Liste */}
      <FlatList
        data={SAMPLE_TODOS}
        renderItem={({ item }) => (
          <TodoListItem item={item} onPress={handleItemPress} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2140",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#5A5D8A",
  },
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2140",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  listContent: {
    paddingVertical: 8,
  },
});
