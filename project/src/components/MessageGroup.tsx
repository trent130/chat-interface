import React from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';

interface MessageGroupProps {
  messages: Message[];
}

export default function MessageGroup({ messages }: MessageGroupProps) {
  return (
    <div className="space-y-1">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          isLastInGroup={
            index === messages.length - 1 ||
            messages[index + 1]?.sender !== message.sender
          }
        />
      ))}
    </div>
  );
}