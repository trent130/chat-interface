import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { Contact } from '../types';

interface ChatHeaderProps {
  contact: Contact;
  showOptions: boolean;
  onToggleOptions: () => void;
}

export default function ChatHeader({ contact, showOptions, onToggleOptions }: ChatHeaderProps) {
  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="font-semibold text-gray-900">{contact.name}</h2>
          <p className="text-sm text-gray-500">
            {contact.online ? "Online" : `Last seen ${contact.lastSeen}`}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Video className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onToggleOptions}
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                View Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                Clear Chat
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600">
                Block Contact
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}