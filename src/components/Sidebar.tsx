import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  MessageCircle, 
  Calendar, 
  Briefcase, 
  TrendingUp,
  Bookmark,
  Settings,
  Plus,
  Star,
  Camera
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  currentUser: User | null;
  onShowCreatePost: () => void;
  onShowCreateStory: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, onShowCreatePost, onShowCreateStory }) => {
  if (!currentUser) return null;

  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Users, label: 'My Network', count: 12 },
    { icon: MessageCircle, label: 'Messages', count: 3 },
    { icon: Calendar, label: 'Events', count: 2 },
    { icon: Briefcase, label: 'Jobs' },
    { icon: TrendingUp, label: 'Trending' },
    { icon: Bookmark, label: 'Saved Posts' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-sm border border-slate-200/50"
      >
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-16 h-16 rounded-full object-cover mx-auto ring-4 ring-white shadow-lg"
            />
            {currentUser.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            )}
          </div>
          <h3 className="font-bold text-slate-900 mt-3">{currentUser.displayName}</h3>
          <p className="text-sm text-slate-600">{currentUser.bio}</p>
          
          <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-slate-200">
            <div className="text-center">
              <div className="font-bold text-slate-900">{currentUser.followers}</div>
              <div className="text-xs text-slate-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-slate-900">{currentUser.following}</div>
              <div className="text-xs text-slate-500">Following</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-slate-900">{currentUser.posts}</div>
              <div className="text-xs text-slate-500">Posts</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShowCreatePost}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Create Post</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShowCreateStory}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
        >
          <Camera className="w-5 h-5" />
          <span>Add Story</span>
        </motion.button>
      </div>

      {/* Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden"
      >
        <div className="p-4">
          <h4 className="font-semibold text-slate-900 mb-3">Navigation</h4>
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.label}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  item.active
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.count && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-4"
      >
        <h4 className="font-semibold text-slate-900 mb-3">Your Activity</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Profile Views</span>
            <span className="font-semibold text-slate-900">1,234</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Post Impressions</span>
            <span className="font-semibold text-slate-900">5,678</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Connections</span>
            <span className="font-semibold text-slate-900">892</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;