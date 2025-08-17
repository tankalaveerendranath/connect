import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreHorizontal,
  Smile,
  Paperclip,
  Mic
} from 'lucide-react';
import { User, Conversation, Message } from '../types';

interface MessagesModalProps {
  currentUser: User;
  users: User[];
  onClose: () => void;
}

const MessagesModal: React.FC<MessagesModalProps> = ({ currentUser, users, onClose }) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const otherUsers = users.filter(user => user.id !== currentUser.id);
  const filteredUsers = otherUsers.filter(user =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock conversations
  const conversations: Conversation[] = otherUsers.slice(0, 5).map(user => ({
    id: `${currentUser.id}-${user.id}`,
    participants: [currentUser.id, user.id],
    type: 'direct',
    lastMessage: {
      id: '1',
      conversationId: `${currentUser.id}-${user.id}`,
      senderId: user.id,
      content: 'Hey! How are you doing today?',
      type: 'text',
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      isRead: Math.random() > 0.5,
      isEdited: false
    },
    unreadCount: Math.floor(Math.random() * 5),
    isArchived: false,
    isMuted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);
  const selectedUser = selectedConv ? users.find(user => 
    user.id === selectedConv.participants.find(id => id !== currentUser.id)
  ) : null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      // Add message logic here
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) return formatTime(date);
    if (hours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[700px] overflow-hidden"
      >
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-slate-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">Messages</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conversation => {
                const user = users.find(u => 
                  u.id === conversation.participants.find(id => id !== currentUser.id)
                );
                if (!user) return null;

                const isSelected = selectedConversation === conversation.id;

                return (
                  <motion.button
                    key={conversation.id}
                    whileHover={{ backgroundColor: 'rgb(248 250 252)' }}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 text-left transition-all duration-200 ${
                      isSelected ? 'bg-blue-50 border-r-2 border-blue-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.displayName}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        {user.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900 truncate">{user.displayName}</h4>
                          {conversation.lastMessage && (
                            <span className="text-xs text-slate-500">
                              {formatDate(conversation.lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 truncate mt-1">
                          {conversation.lastMessage?.content || 'Start a conversation'}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-slate-400">{user.position}</span>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-slate-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={selectedUser.avatar}
                          alt={selectedUser.displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {selectedUser.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{selectedUser.displayName}</h3>
                        <p className="text-sm text-slate-500">
                          {selectedUser.isOnline ? 'Active now' : `Last seen ${formatTime(selectedUser.lastActive)}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                      >
                        <Phone className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                      >
                        <Video className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
                  {/* Sample messages */}
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md">
                      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-900">Hey! How are you doing today?</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 ml-4">2:30 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="max-w-xs lg:max-w-md">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl rounded-tr-md px-4 py-3 text-white">
                        <p className="text-sm">I'm doing great! Thanks for asking. How about you?</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 mr-4 text-right">2:32 PM</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md">
                      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-900">Pretty good! Just working on some exciting projects. Would love to catch up sometime!</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 ml-4">2:35 PM</p>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-slate-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                        >
                          <Paperclip className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 text-slate-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-all duration-200"
                        >
                          <Smile className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                      >
                        <Mic className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!newMessage.trim()}
                        className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-50/50 to-white">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-slate-500">
                    Choose from your existing conversations or start a new one
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MessagesModal;