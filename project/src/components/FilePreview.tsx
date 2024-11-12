import React from 'react';
import { X, Download, FileText, Image as ImageIcon, Film, Music } from 'lucide-react';

interface FilePreviewProps {
  file: {
    name: string;
    type: string;
    size: number;
    url: string;
  };
  onRemove: () => void;
}

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  const getFileIcon = () => {
    if (file.type.startsWith('image')) return <ImageIcon className="w-6 h-6" />;
    if (file.type.startsWith('video')) return <Film className="w-6 h-6" />;
    if (file.type.startsWith('audio')) return <Music className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-100 rounded">
          {getFileIcon()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          onClick={() => window.open(file.url, '_blank')}
        >
          <Download className="w-4 h-4 text-gray-600" />
        </button>
        <button
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          onClick={onRemove}
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}