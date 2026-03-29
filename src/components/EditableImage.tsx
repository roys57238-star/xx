import React, { useState, useEffect, useRef } from 'react';
import { Edit2, Upload, Link as LinkIcon, X, RotateCcw } from 'lucide-react';

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  id: string;
  defaultSrc: string;
  className?: string;
  alt?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}

export function EditableImage({ id, defaultSrc, className, alt, ...props }: EditableImageProps) {
  const [currentSrc, setCurrentSrc] = useState(defaultSrc);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedSrc = localStorage.getItem(`editable-image-${id}`);
    if (savedSrc) {
      setCurrentSrc(savedSrc);
    } else {
      setCurrentSrc(defaultSrc);
    }
  }, [id, defaultSrc]);

  const handleSaveUrl = () => {
    if (tempUrl.trim()) {
      setCurrentSrc(tempUrl);
      localStorage.setItem(`editable-image-${id}`, tempUrl);
      setIsEditing(false);
      setTempUrl('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCurrentSrc(base64String);
        localStorage.setItem(`editable-image-${id}`, base64String);
        setIsEditing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setCurrentSrc(defaultSrc);
    localStorage.removeItem(`editable-image-${id}`);
    setIsEditing(false);
  };

  return (
    <>
      <div className={`relative group inline-block ${className?.includes('w-full') ? 'w-full' : ''} ${className?.includes('h-full') ? 'h-full' : ''}`} style={{ display: className?.includes('w-full') ? 'block' : 'inline-flex' }}>
        <img 
          src={currentSrc} 
          alt={alt || "Editable image"} 
          className={className} 
          {...props} 
        />
        
        {/* Edit Button Overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="absolute top-2 right-2 bg-white/90 text-blue-600 p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-md hover:bg-blue-50 z-30"
          title="Change Image"
        >
          <Edit2 size={16} />
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Change Image</h3>
              <button 
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Option 1: Upload File */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Upload size={16} className="text-blue-500" />
                  Upload from computer
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 border-2 border-dashed border-blue-200 rounded-xl text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={18} />
                  Choose Image File
                </button>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Option 2: Image URL */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <LinkIcon size={16} className="text-blue-500" />
                  Paste Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <button
                    onClick={handleSaveUrl}
                    disabled={!tempUrl.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={14} />
                Reset to Default
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
