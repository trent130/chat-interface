import { Contact, Message } from '../types';

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Emma Watson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    online: true,
    lastSeen: "now"
  },
  {
    id: "2",
    name: "James Miller",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    online: false,
    lastSeen: "2 hours ago"
  },
  {
    id: "3",
    name: "Sophia Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    online: true,
    lastSeen: "now"
  }
];

export const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hey, how are you?",
    timestamp: "10:30 AM",
    sender: "2",
    read: true
  },
  {
    id: "2",
    content: "I am good! Just finished the project presentation.",
    timestamp: "10:32 AM",
    sender: "1",
    read: true
  }
];