import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Clock,
  MapPin,
  Eye,
  Bookmark,
  Flag,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Post, User, Comment } from '../types';

interface PostCardProps {
  post: Post;
  author: User;
  currentUser: User;
  users: User[];
  onLike: () => void;
  onComment: (postId: string, content: string) => void;
  onUserClick: (user: User) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  author,
  currentUser,
  users,
  onLike,
  onComment,
  onUserClick
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isLiked = post.likedBy.includes(currentUser.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id, newComment.trim());
      setNewComment('');
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'now';
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => onUserClick(author)}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <img
                src={author.avatar}
                alt={author.displayName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200"
              />
              {author.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                  {author.displayName}
                </h4>
                {author.isVerified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span>{author.position} at {author.company}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(post.timestamp)}</span>
                </div>
                {post.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{post.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
            >
              <MoreHorizontal className="w-5 h-5" />
            </motion.button>

            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-10"
                >
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Bookmark className="w-4 h-4 mr-3" />
                    Save Post
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Flag className="w-4 h-4 mr-3" />
                    Report Post
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <p className="text-slate-900 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full hover:bg-blue-100 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media */}
      <div className="px-6 pb-4">
        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className={`grid gap-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((image, index) => (
              <motion.img
                key={index}
                whileHover={{ scale: 1.02 }}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full rounded-xl object-cover cursor-pointer"
                style={{ maxHeight: post.images!.length === 1 ? '400px' : '200px' }}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
            ))}
          </div>
        )}

        {/* Video */}
        {post.video && (
          <div className="relative">
            <video
              src={post.video}
              controls
              muted={isMuted}
              className="w-full h-64 rounded-xl object-cover"
              onError={(e) => {
                console.error('Video failed to load:', post.video);
              }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-200"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </motion.button>
          </div>
        )}

        {/* Audio */}
        {post.audio && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900">Audio Post</h4>
                <p className="text-sm text-slate-500">Click to play</p>
              </div>
            </div>
            <audio
              src={post.audio}
              controls
              className="w-full"
              onError={(e) => {
                console.error('Audio failed to load:', post.audio);
              }}
            />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-6 py-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center space-x-4">
            <span>{post.likes} likes</span>
            <span>{post.comments.length} comments</span>
            <span>{post.shares} shares</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{post.views} views</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                isLiked
                  ? 'text-red-600 bg-red-50 hover:bg-red-100'
                  : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">Like</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Comment</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">Share</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-100"
          >
            <div className="p-6 space-y-4">
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="flex space-x-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  />
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-3">
                {post.comments.map(comment => {
                  const commentAuthor = users.find(user => user.id === comment.userId);
                  if (!commentAuthor) return null;

                  return (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex space-x-3"
                    >
                      <button onClick={() => onUserClick(commentAuthor)}>
                        <img
                          src={commentAuthor.avatar}
                          alt={commentAuthor.displayName}
                          className="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-blue-500 transition-all duration-200"
                        />
                      </button>
                      <div className="flex-1">
                        <div className="bg-slate-50 rounded-2xl px-4 py-3">
                          <button
                            onClick={() => onUserClick(commentAuthor)}
                            className="font-medium text-slate-900 hover:text-blue-600 transition-colors duration-200"
                          >
                            {commentAuthor.displayName}
                          </button>
                          <p className="text-slate-700 mt-1">{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 ml-4">
                          <span className="text-xs text-slate-500">{formatTime(comment.timestamp)}</span>
                          <button className="text-xs text-slate-500 hover:text-blue-600 transition-colors duration-200">
                            Like
                          </button>
                          <button className="text-xs text-slate-500 hover:text-blue-600 transition-colors duration-200">
                            Reply
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostCard;