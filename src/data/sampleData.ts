import { Chat } from "../types/chat";

export const SAMPLE_CHATS: Chat[] = [
  {
    id: "1",
    title: "Genel Sohbet",
    lastMessage: "Merhaba! Size nasıl yardımcı olabilirim?",
    timestamp: "14:30",
    unreadCount: 2,
  },
  {
    id: "2",
    title: "Kod Yardımcısı",
    lastMessage: "React Native ile ilgili sorularınızı yanıtlayabilirim.",
    timestamp: "13:45",
  },
  {
    id: "3",
    title: "Yazılım Asistanı",
    lastMessage: "TypeScript konusunda destek almak ister misiniz?",
    timestamp: "12:15",
    unreadCount: 1,
  },
  {
    id: "4",
    title: "Proje Danışmanı",
    lastMessage: "Projenizin planlamasında size yardımcı olabilirim.",
    timestamp: "11:20",
  },
  {
    id: "5",
    title: "Öğrenme Arkadaşı",
    lastMessage: "Yeni teknolojiler hakkında konuşalım!",
    timestamp: "10:00",
    unreadCount: 3,
  },
];
