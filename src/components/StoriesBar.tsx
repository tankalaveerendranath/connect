import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Story, User } from '../types';

interface StoriesBarProps {
  stories: Story[];
  users: User[];
  currentUser: User;
  onUserClick: (user: User) => void;
  onCreateStory: () => void;
}

const StoriesBar: React.FC<StoriesBarProps> = ({ stories, users, currentUser, onUserClick, onCreateStory }) => {
  const storyUsers = stories.reduce((acc, story) => {
    const user = users.find(u => u.id === story.userId);
    if (user && !acc.find(u => u.id === user.id)) {
      acc.push(user);
    }
    return acc;
  }, [] as User[]);

  const hasCurrentUserStory = stories.some(story => story.userId === currentUser.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-4">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {/* Add Story */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreateStory}
          className="flex-shrink-0 text-center cursor-pointer"
        >
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className={`w-16 h-16 rounded-full object-cover ${
                hasCurrentUserStory 
                  ? 'ring-2 ring-purple-500 ring-offset-2' 
                  : 'ring-2 ring-slate-200'
              }`}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-2 font-medium">
            {hasCurrentUserStory ? 'Your Story' : 'Add Story'}
          </p>
        </motion.div>

        {/* Stories */}
        {storyUsers.filter(user => user.id !== currentUser.id).map((user) => (
          <motion.div
            key={user.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onUserClick(user)}
            className="flex-shrink-0 text-center cursor-pointer"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-purple-600 via-pink-600 to-blue-600">
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-2 font-medium truncate w-16">
              {user.firstName}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoriesBar;