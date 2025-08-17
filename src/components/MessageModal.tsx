import React, { useState } from 'react';
import { X, Send, Search, Phone, Video, MoreHorizontal } from 'lucide-react';
import { User, Message, Conversation } from '../types';

interface MessageModalProps {
  currentUser: User | null;
  users: User[];
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ currentUser, users, onClose }) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (!currentUser) return null;

  const otherUsers = users.filter(user => user.id !== currentUser.id);
  const filteredUsers = otherUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock conversations
  const conversations: Conversation[] = otherUsers.map(user => ({
    id: `${currentUser.id}-${user.id}`,
    participants: [currentUser.id, user.id],
    messages: [
      {
        id: '1',
        senderId: user.id,
        receiverId: currentUser.id,
        content: 'Hey! How are you doing?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true
      },
      {
        id: '2',
        senderId: currentUser.id,
        receiverId: user.id,
        content: 'I\'m doing great! Thanks for asking. How about you?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isRead: true
      }
    ],
    lastMessage: {
      id: '2',
      senderId: currentUser.id,
      receiverId: user.id,
      content: 'I\'m doing great! Thanks for asking. How about you?',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      isRead: true
    }
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] overflow-hidden">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-slate-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Messages</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.map(user => {
                const conversation = conversations.find(conv => 
                  conv.participants.includes(user.id)
                );
                const isSelected = selectedConversation === conversation?.id;

                return (
                  <button
                    key={user.id}
                    onClick={() => setSelectedConversation(conversation?.id || null)}
                    className={`w-full p-4 text-left hover:bg-slate-50 transition-all duration-200 ${
                      isSelected ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.fullName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {user.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-900 truncate">{user.fullName}</h4>
                          {conversation?.lastMessage && (
                            <span className="text-xs text-slate-500">
                              {formatTime(conversation.lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 truncate">
                          {conversation?.lastMessage?.content || 'Start a conversation'}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedUser && selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedUser.avatar}
                          alt={selectedUser.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedUser.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{selectedUser.fullName}</h3>
                        <p className="text-sm text-slate-500">
                          {selectedUser.isOnline ? 'Active now' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                  {selectedConv.messages.map(message => {
                    const isOwn = message.senderId === currentUser.id;
                    const sender = users.find(user => user.id === message.senderId);

                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-900 shadow-sm'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isOwn ? 'text-blue-100' : 'text-slate-500'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-slate-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex space-x-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-slate-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
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
      </div>
    </div>
  );
};

export default MessageModal;