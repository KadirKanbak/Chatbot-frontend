import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ViewStyle,
} from "react-native";
import { TodoItem } from "../types/todo";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../styles/ThemeContext";
import { metrics } from "../utils/metrics";

interface Props {
  item: TodoItem;
  onPress: (item: TodoItem) => void;
}

export default function TodoListItem({ item, onPress }: Props) {
  const { theme } = useTheme();

  const getPriorityColor = (priority: TodoItem["priority"]) => {
    switch (priority) {
      case "high":
        return theme.colors.error;
      case "medium":
        return theme.colors.accent;
      case "low":
        return theme.colors.success;
      default:
        return theme.colors.text.primary;
    }
  };

  const getPriorityStyle = () => {
    const color = getPriorityColor(item.priority);
    return {
      backgroundColor: `${color}20`,
      borderColor: `${color}40`,
    } as ViewStyle;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.statusDot,
          {
            backgroundColor:
              item.status === "completed"
                ? theme.colors.success
                : theme.colors.accent,
          } as ViewStyle,
        ]}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: theme.colors.text.primary }]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View style={[styles.priorityBadge, getPriorityStyle()]}>
            <Text
              style={[
                styles.priorityText,
                { color: getPriorityColor(item.priority) } as ViewStyle,
              ]}
            >
              {item.priority}
            </Text>
          </View>
        </View>

        <Text
          style={[styles.description, { color: theme.colors.text.secondary }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.dueDate}>
            <MaterialIcons
              name="calendar-today"
              size={metrics.icons.tiny}
              color={theme.colors.text.secondary}
            />
            <Text
              style={[styles.dateText, { color: theme.colors.text.secondary }]}
            >
              {item.dueDate}
            </Text>
          </View>
          <Text
            style={[
              styles.status,
              {
                color:
                  item.status === "completed"
                    ? theme.colors.success
                    : theme.colors.accent,
              } as ViewStyle,
            ]}
          >
            {item.status === "completed" ? "Tamamlandı" : "Devam Ediyor"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: metrics.borderRadius.medium,
    marginHorizontal: metrics.padding.medium,
    marginBottom: metrics.padding.small,
    padding: metrics.padding.medium,
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
  statusDot: {
    width: metrics.padding.small / 2,
    height: metrics.padding.small / 2,
    borderRadius: metrics.padding.small / 4,
    marginTop: metrics.padding.small,
    marginRight: metrics.padding.medium,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: metrics.padding.small / 2,
  },
  title: {
    fontSize: metrics.fontSize.medium,
    fontWeight: "600",
    flex: 1,
    marginRight: metrics.padding.small,
  },
  priorityBadge: {
    paddingHorizontal: metrics.padding.small,
    paddingVertical: metrics.padding.small / 2,
    borderRadius: metrics.borderRadius.small,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: metrics.fontSize.tiny,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  description: {
    fontSize: metrics.fontSize.small,
    marginBottom: metrics.padding.small,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dueDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: metrics.fontSize.tiny,
    marginLeft: metrics.padding.small / 2,
  },
  status: {
    fontSize: metrics.fontSize.tiny,
    fontWeight: "500",
  },
});
