import React, { useState, useRef } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import FilePreview from './FilePreview';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onTypingStart?: () => void;
  onTypingEnd?: () => void;
}

export default function MessageInput({
  value,
  onChange,
  onSend,
  onTypingStart,
  onTypingEnd
}: MessageInputProps) {
  const [isComposing, setIsComposing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (!isComposing && e.target.value) {
      setIsComposing(true);
      onTypingStart?.();
    } else if (isComposing && !e.target.value) {
      setIsComposing(false);
      onTypingEnd?.();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    onChange(value + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      }));
      setAttachedFiles([...attachedFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {attachedFiles.length > 0 && (
        <div className="mb-4">
          {attachedFiles.map((file, index) => (
            <FilePreview
              key={index}
              file={file}
              onRemove={() => handleRemoveFile(index)}
            />
          ))}
        </div>
      )}
      <div className="flex items-end space-x-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1 relative">
          <textarea
            placeholder={isRecording ? "Recording..." : "Type a message..."}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32 resize-none"
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            rows={1}
            disabled={isRecording}
            style={{
              minHeight: '44px',
              maxHeight: '120px'
            }}
          />
          <div className="absolute right-2 bottom-2 flex items-center space-x-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
            {showEmojiPicker && (
              <EmojiPicker
                onSelect={handleEmojiSelect}
                onClose={() => setShowEmojiPicker(false)}
              />
            )}
          </div>
        </div>
        {value.trim() || attachedFiles.length > 0 ? (
          <button
            onClick={onSend}
            className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-3 rounded-full transition-colors ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}