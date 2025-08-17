import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Briefcase, Star, UserPlus, Check, Clock } from 'lucide-react';
import { User } from '../types';

interface RightPanelProps {
  currentUser: User | null;
  users: User[];
  onUserClick: (user: User) => void;
  onSendFriendRequest: (userId: string) => void;
  getUserFriendRequestStatus: (userId: string) => string;
}

const RightPanel: React.FC<RightPanelProps> = ({ 
  currentUser, 
  users, 
  onUserClick, 
  onSendFriendRequest,
  getUserFriendRequestStatus 
}) => {
  if (!currentUser) return null;

  const suggestedUsers = users.filter(user => user.id !== currentUser.id).slice(0, 4);
  
  const trendingTopics = [
    { tag: 'WebDevelopment', posts: '12.5K posts' },
    { tag: 'AI', posts: '8.9K posts' },
    { tag: 'RemoteWork', posts: '15.2K posts' },
    { tag: 'Startup', posts: '6.7K posts' },
    { tag: 'Design', posts: '9.1K posts' }
  ];

  const upcomingEvents = [
    {
      title: 'Tech Conference 2024',
      date: 'Dec 15',
      attendees: 234
    },
    {
      title: 'Design Workshop',
      date: 'Dec 18',
      attendees: 89
    },
    {
      title: 'Networking Meetup',
      date: 'Dec 20',
      attendees: 156
    }
  ];

  const getFriendRequestButton = (user: User) => {
    const status = getUserFriendRequestStatus(user.id);
    
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center space-x-1 text-xs text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </div>
        );
      case 'accepted':
        return (
          <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
            <Check className="w-3 h-3" />
            <span>Friends</span>
          </div>
        );
      case 'received':
        return (
          <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
            Sent Request
          </div>
        );
      default:
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSendFriendRequest(user.id)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full transition-all duration-200"
          >
            Connect
          </motion.button>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Suggested Connections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            People you may know
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            See all
          </button>
        </div>
        
        <div className="space-y-4">
          {suggestedUsers.map(user => (
            <div key={user.id} className="flex items-center space-x-3">
              <button onClick={() => onUserClick(user)} className="relative group">
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-full object-cover group-hover:ring-2 group-hover:ring-blue-500 transition-all duration-200"
                />
                {user.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onUserClick(user)}
                  className="block text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors duration-200 truncate"
                >
                  {user.displayName}
                </button>
                <p className="text-xs text-slate-500 truncate">{user.position}</p>
                <p className="text-xs text-slate-400 truncate">{user.company}</p>
              </div>
              
              {getFriendRequestButton(user)}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-6"
      >
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
          Trending Topics
        </h3>
        
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <motion.button
              key={topic.tag}
              whileHover={{ x: 4 }}
              className="block w-full text-left hover:bg-slate-50 rounded-lg p-3 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">#{topic.tag}</div>
                  <div className="text-xs text-slate-500">{topic.posts}</div>
                </div>
                <div className="text-lg">
                  {index === 0 ? '🔥' : index === 1 ? '⚡' : index === 2 ? '🚀' : '💡'}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-6"
      >
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          Upcoming Events
        </h3>
        
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              whileHover={{ scale: 1.02 }}
              className="p-3 border border-slate-200 rounded-xl hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-slate-900 text-sm">{event.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{event.date}</p>
                  <p className="text-xs text-slate-400 mt-1">{event.attendees} attending</p>
                </div>
                <div className="text-lg">📅</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Job Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-6"
      >
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-orange-600" />
          Recommended Jobs
        </h3>
        
        <div className="space-y-4">
          <div className="p-3 border border-slate-200 rounded-xl hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200 cursor-pointer">
            <h4 className="font-medium text-slate-900 text-sm">Senior Frontend Developer</h4>
            <p className="text-xs text-slate-500 mt-1">TechCorp • Remote</p>
            <p className="text-xs text-slate-400 mt-1">$120k - $150k</p>
          </div>
          
          <div className="p-3 border border-slate-200 rounded-xl hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200 cursor-pointer">
            <h4 className="font-medium text-slate-900 text-sm">Product Designer</h4>
            <p className="text-xs text-slate-500 mt-1">StartupXYZ • San Francisco</p>
            <p className="text-xs text-slate-400 mt-1">$100k - $130k</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RightPanel;