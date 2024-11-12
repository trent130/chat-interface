import React, { useState, useCallback } from 'react';
import ContactList from './ContactList';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { contacts, initialMessages } from '../data';
import { Contact, Message } from '../types';

export default function ChatInterface() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }),
      sender: "1",
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
    setIsTyping(false);
  }, [newMessage]);

  const simulateTyping = useCallback(() => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 3000);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <ContactList
        contacts={filteredContacts}
        selectedContact={selectedContact}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onContactSelect={setSelectedContact}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader
          contact={selectedContact}
          showOptions={showOptions}
          onToggleOptions={() => setShowOptions(!showOptions)}
        />
        <MessageList
          messages={messages}
          isTyping={isTyping}
        />
        <MessageInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          onTypingStart={simulateTyping}
          onTypingEnd={() => setIsTyping(false)}
        />
      </div>
    </div>
  );
}