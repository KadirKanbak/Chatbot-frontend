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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { TodoItem } from "../types/todo";
import { SAMPLE_TODOS } from "../data/todoData";
import { useTheme } from "../styles/ThemeContext";
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
    <LinearGradient
      colors={
        themeType === "light"
          ? ["#F0F5FF", "#D6E4FF", "#ADC6FF"]
          : ["#1F2140", "#2C2E47", "#3A3D66"]
      }
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.container, dynamicStyles.container]}
    >
      <StatusBar
        barStyle={themeType === "light" ? "dark-content" : "light-content"}
      />

      {/* Header */}
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>
          Görev Detayı
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView
        style={[styles.content, dynamicStyles.content]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={[styles.section, dynamicStyles.section]}>
          <Text style={[styles.title, dynamicStyles.title]}>{todo.title}</Text>
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
        </View>

        {/* Description */}
        <View style={[styles.section, dynamicStyles.section]}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            Açıklama
          </Text>
          <Text style={[styles.description, dynamicStyles.description]}>
            {todo.description}
          </Text>
        </View>

        {/* Status & Date */}
        <View style={styles.row}>
          <View style={[styles.infoBox, dynamicStyles.infoBox]}>
            <Text style={[styles.infoLabel, dynamicStyles.infoLabel]}>
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
                    color: todo.status === "completed" ? "#52C41A" : "#FAAD14",
                  },
                ]}
              >
                {todo.status === "completed" ? "Tamamlandı" : "Devam Ediyor"}
              </Text>
            </View>
          </View>

          <View style={[styles.infoBox, dynamicStyles.infoBox]}>
            <Text style={[styles.infoLabel, dynamicStyles.infoLabel]}>
              Bitiş Tarihi
            </Text>
            <View style={styles.dateContainer}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={theme.colors.text.primary}
              />
              <Text style={[styles.dateText, dynamicStyles.dateText]}>
                {todo.dueDate}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2140",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2140",
    marginBottom: 8,
  },
  priorityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2140",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#5A5D8A",
    lineHeight: 22,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
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
  infoLabel: {
    fontSize: 14,
    color: "#8C8C8C",
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "500",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 15,
    color: "#1F2140",
    fontWeight: "500",
  },
});
