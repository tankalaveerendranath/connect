import React from 'react';
import { motion } from 'framer-motion';
import { User, Post, Story } from '../types';
import PostCard from './PostCard';
import StoriesBar from './StoriesBar';
import WelcomeCard from './WelcomeCard';

interface FeedProps {
  currentUser: User | null;
  posts: Post[];
  users: User[];
  stories: Story[];
  onLikePost: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onUserClick: (user: User) => void;
  onCreatePost: () => void;
  onCreateStory: () => void;
}

const Feed: React.FC<FeedProps> = ({
  currentUser,
  posts,
  users,
  stories,
  onLikePost,
  onComment,
  onUserClick,
  onCreatePost,
  onCreateStory
}) => {
  if (!currentUser) {
    return <WelcomeCard onCreatePost={onCreatePost} />;
  }

  return (
    <div className="space-y-6">
      {/* Stories */}
      <StoriesBar 
        stories={stories}
        users={users}
        currentUser={currentUser}
        onUserClick={onUserClick}
        onCreateStory={onCreateStory}
      />

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post, index) => {
          const author = users.find(user => user.id === post.userId);
          if (!author) return null;

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PostCard
                post={post}
                author={author}
                currentUser={currentUser}
                users={users}
                onLike={() => onLikePost(post.id)}
                onComment={onComment}
                onUserClick={onUserClick}
              />
            </motion.div>
          );
        })}
      </div>

      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-12 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No posts yet</h3>
          <p className="text-slate-600 mb-6">Be the first to share something amazing with your network!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreatePost}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Create Your First Post
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Feed;