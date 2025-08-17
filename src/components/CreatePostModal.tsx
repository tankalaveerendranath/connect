import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Image, 
  Video, 
  Music,
  MapPin, 
  Hash, 
  Globe,
  Users,
  Lock,
  Link
} from 'lucide-react';
import { User, Post } from '../types';

interface CreatePostModalProps {
  currentUser: User;
  onClose: () => void;
  onCreatePost: (post: Partial<Post>) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ currentUser, onClose, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [mediaUrls, setMediaUrls] = useState<{
    images: string[];
    video: string;
    audio: string;
  }>({
    images: [],
    video: '',
    audio: ''
  });
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<'public' | 'private' | 'friends'>('public');
  const [isLoading, setIsLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    
    // Determine post type based on media
    let postType: Post['type'] = 'text';
    if (mediaUrls.video) postType = 'video';
    else if (mediaUrls.audio) postType = 'audio';
    else if (mediaUrls.images.length > 0) postType = 'image';
    
    // Simulate API call
    setTimeout(() => {
      onCreatePost({
        content: content.trim(),
        images: mediaUrls.images.length > 0 ? mediaUrls.images : undefined,
        video: mediaUrls.video || undefined,
        audio: mediaUrls.audio || undefined,
        location: location || undefined,
        tags,
        privacy,
        type: postType
      });
      setIsLoading(false);
    }, 1000);
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && !mediaUrls.images.includes(newImageUrl.trim())) {
      setMediaUrls(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setMediaUrls(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
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
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Create Post</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[calc(90vh-80px)]">
          <div className="flex-1 overflow-y-auto">
            {/* User Info */}
            <div className="p-6 pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200"
                />
                <div>
                  <h3 className="font-semibold text-slate-900">{currentUser.displayName}</h3>
                  <div className="flex items-center space-x-2">
                    <select
                      value={privacy}
                      onChange={(e) => setPrivacy(e.target.value as any)}
                      className="text-sm text-slate-600 bg-slate-100 border-none rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">🌍 Public</option>
                      <option value="friends">👥 Friends</option>
                      <option value="private">🔒 Private</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Content */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-32 resize-none border-none outline-none text-lg placeholder-slate-400 bg-transparent"
                autoFocus
              />

              {/* Media URLs Section */}
              <div className="space-y-4 mt-6">
                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Add Images (URLs)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addImageUrl}
                      disabled={!newImageUrl.trim() || !isValidUrl(newImageUrl)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Add
                    </motion.button>
                  </div>
                </div>

                {/* Video */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={mediaUrls.video}
                    onChange={(e) => setMediaUrls(prev => ({ ...prev, video: e.target.value }))}
                    placeholder="https://example.com/video.mp4"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                {/* Audio */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Audio URL
                  </label>
                  <input
                    type="url"
                    value={mediaUrls.audio}
                    onChange={(e) => setMediaUrls(prev => ({ ...prev, audio: e.target.value }))}
                    placeholder="https://example.com/audio.mp3"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              {/* Preview Images */}
              <AnimatePresence>
                {mediaUrls.images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-3 mt-4"
                  >
                    {mediaUrls.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Invalid+Image';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Preview Video */}
              {mediaUrls.video && isValidUrl(mediaUrls.video) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <video
                    src={mediaUrls.video}
                    controls
                    className="w-full h-48 rounded-xl object-cover"
                    onError={(e) => {
                      console.error('Video failed to load:', mediaUrls.video);
                    }}
                  />
                </motion.div>
              )}

              {/* Preview Audio */}
              {mediaUrls.audio && isValidUrl(mediaUrls.audio) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <audio
                    src={mediaUrls.audio}
                    controls
                    className="w-full"
                    onError={(e) => {
                      console.error('Audio failed to load:', mediaUrls.audio);
                    }}
                  />
                </motion.div>
              )}

              {/* Location */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add location..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Tags */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tags
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addTag}
                    disabled={!newTag.trim()}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Add
                  </motion.button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-purple-400 hover:text-purple-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span>Add media via URLs above</span>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!content.trim() || isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Posting...</span>
                  </div>
                ) : (
                  'Post'
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePostModal;