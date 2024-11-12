import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import MessageGroup from './MessageGroup';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
}

export default function MessageList({ messages, isTyping = false }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const groupMessages = (msgs: Message[]): Message[][] => {
    return msgs.reduce((groups: Message[][], message: Message) => {
      const currentGroup = groups[groups.length - 1];
      
      if (!currentGroup || currentGroup[0].sender !== message.sender) {
        groups.push([message]);
      } else {
        currentGroup.push(message);
      }
      
      return groups;
    }, []);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const messageGroups = groupMessages(messages);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-3xl mx-auto py-6 px-4">
        {messageGroups.map((group, index) => (
          <MessageGroup key={index} messages={group} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}