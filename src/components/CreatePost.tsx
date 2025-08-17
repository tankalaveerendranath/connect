import React, { useState } from 'react';
import { Image, Smile, MapPin, Calendar } from 'lucide-react';
import { User } from '../types';

interface CreatePostProps {
  currentUser: User;
  onCreatePost: (content: string, image?: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ currentUser, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content.trim());
      setContent('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="What's on your mind?"
              className="w-full resize-none border-none outline-none text-lg placeholder-slate-400 bg-transparent"
              rows={isExpanded ? 3 : 1}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                >
                  <Image className="w-5 h-5" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-200"
                >
                  <Smile className="w-5 h-5" />
                  <span className="text-sm font-medium">Feeling</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Location</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setContent('');
                  }}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;