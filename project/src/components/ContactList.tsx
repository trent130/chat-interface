import React from 'react';
import { Search } from 'lucide-react';
import { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onContactSelect: (contact: Contact) => void;
}

export default function ContactList({
  contacts,
  selectedContact,
  searchQuery,
  onSearchChange,
  onContactSelect
}: ContactListProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-5rem)]">
        {contacts.map(contact => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact)}
            className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedContact.id === contact.id ? "bg-blue-50" : ""
            }`}
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              <p className="text-sm text-gray-500">
                {contact.online ? "Online" : `Last seen ${contact.lastSeen}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}