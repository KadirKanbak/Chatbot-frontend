import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { TodoItem } from "../types/todo";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  item: TodoItem;
  onPress: (item: TodoItem) => void;
};

export default function TodoListItem({ item, onPress }: Props) {
  const getPriorityColor = (priority: TodoItem["priority"]) => {
    switch (priority) {
      case "high":
        return "#FF4D4F";
      case "medium":
        return "#FAAD14";
      case "low":
        return "#52C41A";
      default:
        return "#000";
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.statusDot,
          {
            backgroundColor:
              item.status === "completed" ? "#52C41A" : "#FAAD14",
          },
        ]}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <View
            style={[
              styles.priorityBadge,
              {
                backgroundColor: getPriorityColor(item.priority) + "20",
                borderColor: getPriorityColor(item.priority) + "40",
              },
            ]}
          >
            <Text
              style={[
                styles.priorityText,
                {
                  color: getPriorityColor(item.priority),
                },
              ]}
            >
              {item.priority}
            </Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.dueDate}>
            <Ionicons name="calendar-outline" size={14} color="#8C8C8C" />
            <Text style={styles.dateText}>{item.dueDate}</Text>
          </View>
          <Text
            style={[
              styles.status,
              {
                color: item.status === "completed" ? "#52C41A" : "#FAAD14",
              },
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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
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
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2140",
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 14,
    color: "#5A5D8A",
    marginBottom: 8,
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
    fontSize: 12,
    color: "#8C8C8C",
    marginLeft: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: "500",
  },
});
