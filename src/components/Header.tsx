import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  MessageCircle, 
  Plus, 
  User, 
  LogOut, 
  Menu,
  Home,
  Users,
  Calendar,
  Briefcase,
  Settings,
  UserPlus
} from 'lucide-react';
import { User as UserType, Notification, FriendRequest } from '../types';

interface HeaderProps {
  currentUser: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
  onShowMessages: () => void;
  onShowNotifications: () => void;
  onShowProfile: () => void;
  onCreatePost: () => void;
  onShowFriendRequests: () => void;
  notifications: Notification[];
  pendingFriendRequests: FriendRequest[];
}

const Header: React.FC<HeaderProps> = ({
  currentUser,
  onLogin,
  onLogout,
  onShowMessages,
  onShowNotifications,
  onShowProfile,
  onCreatePost,
  onShowFriendRequests,
  notifications,
  pendingFriendRequests
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const pendingRequestsCount = pendingFriendRequests.length;

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              SocialHub
            </h1>
          </motion.div>

          {/* Search Bar */}
          {currentUser && (
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search people, posts, groups..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-100/80 border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 placeholder-slate-500"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    <Home className="h-5 w-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    <Users className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onShowMessages}
                    className="relative p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onShowNotifications}
                    className="relative p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                      >
                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                      </motion.span>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onShowFriendRequests}
                    className="relative p-3 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200"
                  >
                    <UserPlus className="h-5 w-5" />
                    {pendingRequestsCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                      >
                        {pendingRequestsCount > 9 ? '9+' : pendingRequestsCount}
                      </motion.span>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCreatePost}
                    className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.button>

                  <div className="w-px h-8 bg-slate-200 mx-2"></div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onShowProfile}
                    className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-xl transition-all duration-200"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.displayName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
                    />
                    <span className="hidden lg:block font-medium text-slate-700">
                      {currentUser.firstName}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onLogout}
                    className="p-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                </motion.button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLogin}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  <strong>Demo:</strong> Create a new account or try: alex@techcorp.com
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && currentUser && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-2">
              <button className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200">
                <Home className="h-5 w-5 mr-3" />
                Home
              </button>
              <button className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200">
                <Users className="h-5 w-5 mr-3" />
                Network
              </button>
              <button 
                onClick={onShowMessages}
                className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <MessageCircle className="h-5 w-5 mr-3" />
                Messages
              </button>
              <button 
                onClick={onShowNotifications}
                className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <Bell className="h-5 w-5 mr-3" />
                Notifications
                {unreadNotifications > 0 && (
                  <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              <button 
                onClick={onShowFriendRequests}
                className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <UserPlus className="h-5 w-5 mr-3" />
                Friend Requests
                {pendingRequestsCount > 0 && (
                  <span className="ml-auto w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                    {pendingRequestsCount}
                  </span>
                )}
              </button>
              <button 
                onClick={onShowProfile}
                className="flex items-center w-full px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;