export interface Contact {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  read: boolean;
  type?: 'text' | 'image' | 'file' | 'audio';
  fileName?: string;
  fileSize?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}