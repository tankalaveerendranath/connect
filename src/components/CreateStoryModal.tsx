import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Image, Video, Type } from 'lucide-react';
import { User, Story } from '../types';

interface CreateStoryModalProps {
  currentUser: User;
  onClose: () => void;
  onCreateStory: (story: Partial<Story>) => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ currentUser, onClose, onCreateStory }) => {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'text'>('text');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !mediaUrl.trim()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      onCreateStory({
        content: content.trim(),
        image: mediaType === 'image' ? mediaUrl : undefined,
        video: mediaType === 'video' ? mediaUrl : undefined
      });
      setIsLoading(false);
    }, 1000);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Create Story</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200"
            />
            <div>
              <h3 className="font-semibold text-slate-900">{currentUser.displayName}</h3>
              <p className="text-sm text-slate-500">Share your story</p>
            </div>
          </div>

          {/* Media Type Selection */}
          <div className="flex space-x-2 mb-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMediaType('text')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                mediaType === 'text'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Text</span>
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMediaType('image')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                mediaType === 'image'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Image</span>
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMediaType('video')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                mediaType === 'video'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video</span>
            </motion.button>
          </div>

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share what's happening..."
            className="w-full h-24 resize-none border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          />

          {/* Media URL Input */}
          {mediaType !== 'text' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {mediaType === 'image' ? 'Image URL' : 'Video URL'}
              </label>
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder={`https://example.com/${mediaType}.${mediaType === 'image' ? 'jpg' : 'mp4'}`}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              />
            </div>
          )}

          {/* Media Preview */}
          {mediaUrl && isValidUrl(mediaUrl) && (
            <div className="mt-4">
              {mediaType === 'image' ? (
                <img
                  src={mediaUrl}
                  alt="Story preview"
                  className="w-full h-48 object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                  }}
                />
              ) : (
                <video
                  src={mediaUrl}
                  controls
                  className="w-full h-48 rounded-xl object-cover"
                  onError={(e) => {
                    console.error('Video failed to load:', mediaUrl);
                  }}
                />
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={(!content.trim() && !mediaUrl.trim()) || isLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sharing...</span>
                </div>
              ) : (
                'Share Story'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateStoryModal;