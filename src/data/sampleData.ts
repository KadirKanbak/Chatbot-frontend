import { Chat } from "../types/chat";

export const SAMPLE_CHATS: Chat[] = [
  {
    id: "1",
    title: "Bütçe Planlaması",
    lastMessage: "Aylık harcamalarınızı analiz edelim.",
    timestamp: "14:30",
    unreadCount: 2,
  },
  {
    id: "2",
    title: "Yatırım Danışmanı",
    lastMessage: "Portföyünüz için yeni önerilerim var.",
    timestamp: "13:45",
  },
  {
    id: "3",
    title: "Tasarruf Asistanı",
    lastMessage: "Bu ay %15 tasarruf hedefine ulaştınız!",
    timestamp: "12:15",
    unreadCount: 1,
  },
  {
    id: "4",
    title: "Kredi Analizi",
    lastMessage: "Size uygun kredi seçeneklerini inceleyelim.",
    timestamp: "11:20",
  },
  {
    id: "5",
    title: "Market Analizi",
    lastMessage: "Güncel piyasa trendlerini değerlendirelim.",
    timestamp: "10:00",
    unreadCount: 3,
  },
];
