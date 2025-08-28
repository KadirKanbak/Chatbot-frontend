import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { TodoItem } from "../types/todo";
import { SAMPLE_TODOS } from "../data/todoData";
import { useTheme } from "@/styles/ThemeContext";
import { ThemeToggleButton } from "../components/ThemeToggleButton";

type Nav = NativeStackNavigationProp<RootStackParamList, "TodoDetails">;
type RouteProps = RouteProp<RootStackParamList, "TodoDetails">;

export default function TodoDetailsScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProps>();
  const [todo, setTodo] = useState<TodoItem | null>(null);
  const { theme, themeType } = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeToggleButton />,
    });
  }, [navigation]);

  useEffect(() => {
    const currentTodo = SAMPLE_TODOS.find((t) => t.id === route.params.todoId);
    if (currentTodo) {
      setTodo(currentTodo);
    }
  }, [route.params.todoId]);

  if (!todo) return null;

  const getPriorityColor = (priority: TodoItem["priority"]) => {
    switch (priority) {
      case "high":
        return "#FF4D4F";
      case "medium":
        return "#FAAD14";
      case "low":
        return "#52C41A";
      default:
        return theme.colors.text.primary;
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.surface,
    },
    headerTitle: {
      color: theme.colors.text.primary,
    },
    content: {
      backgroundColor: theme.colors.background,
    },
    section: {
      backgroundColor: theme.colors.surface,
    },
    title: {
      color: theme.colors.text.primary,
    },
    sectionTitle: {
      color: theme.colors.text.primary,
    },
    description: {
      color: theme.colors.text.secondary,
    },
    infoBox: {
      backgroundColor: theme.colors.surface,
    },
    infoLabel: {
      color: theme.colors.text.secondary,
    },
    dateText: {
      color: theme.colors.text.primary,
    },
  });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={themeType === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.text.inverse}
          />
        </TouchableOpacity>
        <Text
          style={[styles.headerTitle, { color: theme.colors.text.inverse }]}
        >
          Görev Detayı
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor:
                themeType === "dark"
                  ? theme.colors.brand.bg
                  : "rgba(255,255,255,0.95)",
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text
            style={[styles.taskTitle, { color: theme.colors.text.primary }]}
          >
            {todo.title}
          </Text>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(todo.priority) + "20" },
            ]}
          >
            <Text
              style={[
                styles.priorityText,
                { color: getPriorityColor(todo.priority) },
              ]}
            >
              {todo.priority} öncelik
            </Text>
          </View>
          <Text
            style={[
              styles.sectionLabel,
              { color: theme.colors.text.secondary },
            ]}
          >
            Açıklama
          </Text>
          <Text
            style={[styles.description, { color: theme.colors.text.secondary }]}
          >
            {todo.description}
          </Text>
          <View style={styles.row}>
            <View style={[styles.infoItem]}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.text.secondary },
                ]}
              >
                Durum
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      todo.status === "completed" ? "#52C41A20" : "#FAAD1420",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        todo.status === "completed" ? "#52C41A" : "#FAAD14",
                    },
                  ]}
                >
                  {todo.status === "completed" ? "Tamamlandı" : "Devam Ediyor"}
                </Text>
              </View>
            </View>
            <View style={[styles.infoItem]}>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.text.secondary },
                ]}
              >
                Bitiş Tarihi
              </Text>
              <View style={styles.dateRow}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={theme.colors.text.primary}
                />
                <Text
                  style={[
                    styles.dateText,
                    { color: theme.colors.text.primary },
                  ]}
                >
                  {todo.dueDate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 50 : (StatusBar.currentHeight || 0) + 4,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  scroll: { padding: 16, paddingBottom: 40 },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 8 },
    }),
  },
  taskTitle: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  priorityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 6,
  },
  description: { fontSize: 15, lineHeight: 22, marginBottom: 20 },
  row: { flexDirection: "row", gap: 12 },
  infoItem: { flex: 1 },
  infoLabel: { fontSize: 13, fontWeight: "600", marginBottom: 6 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  statusText: { fontSize: 13, fontWeight: "500" },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dateText: { fontSize: 15, fontWeight: "500" },
});
