import { TodoItem } from "../types/todo";

export const SAMPLE_TODOS: TodoItem[] = [
  {
    id: "1",
    title: "React Native Öğrenme",
    description: "Temel bileşenler ve yaşam döngüsü yönetimini öğren",
    status: "completed",
    priority: "high",
    dueDate: "2025-08-20",
  },
  {
    id: "2",
    title: "UI Tasarımı",
    description: "Modern ve kullanıcı dostu arayüz tasarımı yap",
    status: "completed",
    priority: "high",
    dueDate: "2025-08-18",
  },
  {
    id: "3",
    title: "State Yönetimi",
    description: "Global state yönetimi için Redux veya Context API kullan",
    status: "pending",
    priority: "medium",
    dueDate: "2025-08-25",
  },
  {
    id: "4",
    title: "API Entegrasyonu",
    description: "REST API ile veri alışverişi yapılacak",
    status: "pending",
    priority: "high",
    dueDate: "2025-08-30",
  },
  {
    id: "5",
    title: "Test Yazımı",
    description: "Unit testler ve entegrasyon testleri ekle",
    status: "pending",
    priority: "medium",
    dueDate: "2025-09-05",
  },
];
