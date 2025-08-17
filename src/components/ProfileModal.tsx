import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Calendar, 
  Link as LinkIcon, 
  Edit, 
  MessageCircle, 
  UserPlus,
  Building,
  Star,
  Globe,
  Check,
  Clock
} from 'lucide-react';
import { User, Post } from '../types';

interface ProfileModalProps {
  user: User;
  currentUser: User | null;
  posts: Post[];
  onClose: () => void;
  onEditProfile?: () => void;
  onSendFriendRequest: (userId: string) => void;
  friendRequestStatus: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ 
  user, 
  currentUser, 
  posts, 
  onClose, 
  onEditProfile,
  onSendFriendRequest,
  friendRequestStatus
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'activity'>('posts');
  const isOwnProfile = currentUser?.id === user.id;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return 'now';
  };

  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getFriendRequestButton = () => {
    switch (friendRequestStatus) {
      case 'pending':
        return (
          <div className="flex items-center space-x-2 px-6 py-3 bg-orange-50 text-orange-600 rounded-xl font-semibold">
            <Clock className="w-5 h-5" />
            <span>Request Sent</span>
          </div>
        );
      case 'accepted':
        return (
          <div className="flex items-center space-x-2 px-6 py-3 bg-green-50 text-green-600 rounded-xl font-semibold">
            <Check className="w-5 h-5" />
            <span>Friends</span>
          </div>
        );
      case 'received':
        return (
          <div className="flex items-center space-x-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold">
            <UserPlus className="w-5 h-5" />
            <span>Respond to Request</span>
          </div>
        );
      default:
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSendFriendRequest(user.id)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            <UserPlus className="w-5 h-5" />
            <span>Connect</span>
          </motion.button>
        );
    }
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
        className="lkj bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative">
            {user.coverImage && (
              <img
                src={user.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Profile Info */}
          <div className="px-8 pb-6">
            <div className="flex items-end justify-between -mt-20 mb-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-40 h-40 rounded-full border-6 border-white object-cover shadow-xl"
                />
                {user.isOnline && (
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-emerald-500 border-4 border-white rounded-full"></div>
                )}
                {user.isVerified && (
                  <div className="absolute top-4 right-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white">
                    <Star className="w-5 h-5 text-white fill-current" />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-20">
                {isOwnProfile ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEditProfile}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all duration-200"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Edit Profile</span>
                  </motion.button>
                ) : (
                  <>
                    {getFriendRequestButton()}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all duration-200"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Message</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{user.displayName}</h1>
              <p className="text-lg text-slate-600 mb-1">{user.position} at {user.company}</p>
              <p className="text-slate-500 mb-4">@{user.username}</p>
              <p className="text-slate-700 mb-6 leading-relaxed">{user.bio}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6">
                {user.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatJoinDate(user.joinedDate)}</span>
                </div>
                {user.website && (
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="w-4 h-4" />
                    <a href={user.website} className="text-blue-600 hover:underline">
                      {user.website}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>{user.company}</span>
                </div>
              </div>

              <div className="flex space-x-8 text-sm">
                <div>
                  <span className="font-bold text-slate-900 text-lg">{user.following}</span>
                  <span className="text-slate-500 ml-2">Following</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-lg">{user.followers}</span>
                  <span className="text-slate-500 ml-2">Followers</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-lg">{posts.length}</span>
                  <span className="text-slate-500 ml-2">Posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <nav className="flex px-8">
            {['posts', 'about', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-6 font-semibold text-sm transition-colors duration-200 border-b-2 capitalize ${
                  activeTab === tab
                    ? 'text-blue-600 border-blue-600'
                    : 'text-slate-500 border-transparent hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'posts' && (
              <motion.div
                key="posts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 space-y-6"
              >
                {posts.length > 0 ? (
                  posts.map(post => (
                    <div key={post.id} className="border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatTime(post.timestamp)}</span>
                        </div>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                          {post.type}
                        </span>
                      </div>
                      <p className="text-slate-900 mb-4 leading-relaxed">{post.content}</p>
                      {post.images && post.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {post.images.slice(0, 2).map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Post image ${index + 1}`}
                              className="w-full h-32 rounded-xl object-cover"
                            />
                          ))}
                        </div>
                      )}
                      {post.video && (
                        <div className="mb-4">
                          <video
                            src={post.video}
                            controls
                            className="w-full h-64 rounded-xl object-cover"
                          />
                        </div>
                      )}
                      {post.audio && (
                        <div className="mb-4">
                          <audio
                            src={post.audio}
                            controls
                            className="w-full"
                          />
                        </div>
                      )}
                      <div className="flex items-center space-x-6 text-sm text-slate-500">
                        <span>{post.likes} likes</span>
                        <span>{post.comments.length} comments</span>
                        <span>{post.shares} shares</span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">No posts yet</h3>
                    <p className="text-slate-500 text-sm">
                      {isOwnProfile ? "Share your first post to get started!" : `${user.displayName} hasn't posted anything yet.`}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 space-y-8"
              >
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">About</h3>
                  <p className="text-slate-700 leading-relaxed">{user.bio}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Professional Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-slate-400" />
                      <div>
                        <div className="font-medium text-slate-900">{user.position}</div>
                        <div className="text-sm text-slate-500">{user.company}</div>
                      </div>
                    </div>
                    {user.location && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-700">{user.location}</span>
                      </div>
                    )}
                    {user.website && (
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-slate-400" />
                        <a href={user.website} className="text-blue-600 hover:underline">
                          {user.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {user.skills.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {user.interests.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{posts.length}</div>
                    <div className="text-sm text-blue-700">Posts</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl">
                    <div className="text-2xl font-bold text-emerald-600 mb-2">{user.followers}</div>
                    <div className="text-sm text-emerald-700">Followers</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                    <div className="text-2xl font-bold text-purple-600 mb-2">{user.following}</div>
                    <div className="text-sm text-purple-700">Following</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                    <div className="text-2xl font-bold text-orange-600 mb-2">4.8</div>
                    <div className="text-sm text-orange-700">Rating</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileModal;