export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: "completed" | "pending";
  priority: "high" | "medium" | "low";
  dueDate: string;
}

export interface TodoSummary {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}
