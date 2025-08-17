import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Check, X as XIcon, Clock } from 'lucide-react';
import { User, FriendRequest } from '../types';

interface FriendRequestsModalProps {
  currentUser: User;
  friendRequests: FriendRequest[];
  users: User[];
  onClose: () => void;
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

const FriendRequestsModal: React.FC<FriendRequestsModalProps> = ({
  currentUser,
  friendRequests,
  users,
  onClose,
  onAccept,
  onReject
}) => {
  const pendingRequests = friendRequests.filter(req => 
    req.toUserId === currentUser.id && req.status === 'pending'
  );

  const sentRequests = friendRequests.filter(req => 
    req.fromUserId === currentUser.id && req.status === 'pending'
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
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
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <UserPlus className="w-6 h-6 mr-2 text-blue-600" />
            Friend Requests
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {/* Pending Requests (Received) */}
          {pendingRequests.length > 0 && (
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">Pending Requests</h3>
              <div className="space-y-4">
                {pendingRequests.map(request => {
                  const fromUser = users.find(u => u.id === request.fromUserId);
                  if (!fromUser) return null;

                  return (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl"
                    >
                      <img
                        src={fromUser.avatar}
                        alt={fromUser.displayName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 truncate">
                          {fromUser.displayName}
                        </h4>
                        <p className="text-sm text-slate-500 truncate">
                          {fromUser.position} at {fromUser.company}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatTime(request.timestamp)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onAccept(request.id)}
                          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-200"
                        >
                          <Check className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onReject(request.id)}
                          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200"
                        >
                          <XIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sent Requests */}
          {sentRequests.length > 0 && (
            <div className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Sent Requests</h3>
              <div className="space-y-4">
                {sentRequests.map(request => {
                  const toUser = users.find(u => u.id === request.toUserId);
                  if (!toUser) return null;

                  return (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl"
                    >
                      <img
                        src={toUser.avatar}
                        alt={toUser.displayName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 truncate">
                          {toUser.displayName}
                        </h4>
                        <p className="text-sm text-slate-500 truncate">
                          {toUser.position} at {toUser.company}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatTime(request.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {pendingRequests.length === 0 && sentRequests.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No friend requests</h3>
              <p className="text-slate-500">
                When people send you friend requests, they'll appear here.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FriendRequestsModal;