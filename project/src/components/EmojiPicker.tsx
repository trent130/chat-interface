import React from 'react';

const EMOJI_CATEGORIES = {
  'Smileys': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌'],
  'Gestures': ['👍', '👎', '👌', '✌️', '🤞', '🤝', '👏', '🙌', '👐', '🤲'],
  'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎'],
  'Animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
};

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  return (
    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-72">
      <div className="max-h-64 overflow-y-auto">
        {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
          <div key={category} className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 mb-2">{category}</h3>
            <div className="grid grid-cols-8 gap-1">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => onSelect(emoji)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors text-xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}