import React, { useState } from 'react';
import { Check, CheckCheck, Download, Play, Pause } from 'lucide-react';
import { Message } from '../types';
import { formatMessageTime } from '../utils/dateFormat';

interface MessageBubbleProps {
  message: Message;
  isLastInGroup: boolean;
}

export default function MessageBubble({ message, isLastInGroup }: MessageBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isSent = message.sender === "1";

  const renderContent = () => {
    if (message.type === 'image') {
      return (
        <img
          src={message.content}
          alt="Shared image"
          className="rounded-lg max-w-[300px] max-h-[300px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => window.open(message.content, '_blank')}
        />
      );
    }

    if (message.type === 'file') {
      return (
        <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{message.fileName}</p>
            <p className="text-xs text-gray-500">{message.fileSize}</p>
          </div>
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      );
    }

    if (message.type === 'audio') {
      return (
        <div className="flex items-center space-x-3 p-2">
          <button
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <div className="flex-1 h-1 bg-gray-200 rounded-full">
            <div className="h-full w-1/3 bg-blue-500 rounded-full" />
          </div>
          <span className="text-xs">0:23</span>
        </div>
      );
    }

    return <p className="whitespace-pre-wrap break-words">{message.content}</p>;
  };

  return (
    <div
      className={`flex ${isSent ? "justify-end" : "justify-start"} ${
        isLastInGroup ? "mb-3" : "mb-0.5"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isSent
            ? "bg-blue-500 text-white rounded-br-sm"
            : "bg-white text-gray-900 rounded-bl-sm"
        } shadow-sm transition-all duration-200 hover:shadow-md`}
      >
        {renderContent()}
        {isLastInGroup && (
          <div className={`flex items-center justify-end mt-1 space-x-1 ${
            isSent ? "text-blue-100" : "text-gray-400"
          }`}>
            <span className="text-xs">{formatMessageTime(message.timestamp)}</span>
            {isSent && (
              message.read ? (
                <CheckCheck className="w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}