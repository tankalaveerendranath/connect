import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, UserPlus, Share2, Bell } from 'lucide-react';
import { Notification, User } from '../types';

interface NotificationsModalProps {
  notifications: Notification[];
  users: User[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  users,
  onClose,
  onMarkAsRead
}) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-emerald-500" />;
      case 'share':
        return <Share2 className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
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
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {notifications.map((notification, index) => {
                const fromUser = users.find(u => u.id === notification.fromUserId);
                if (!fromUser) return null;

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onMarkAsRead(notification.id)}
                    className={`p-4 hover:bg-slate-50 cursor-pointer transition-all duration-200 ${
                      !notification.isRead ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={fromUser.avatar}
                          alt={fromUser.displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">
                          <span className="font-semibold">{fromUser.displayName}</span>
                          {' '}
                          <span className="text-slate-600">{notification.content}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No notifications</h3>
              <p className="text-slate-500">You're all caught up! Check back later for updates.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
              Mark all as read
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NotificationsModal;