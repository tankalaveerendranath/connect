import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import RightPanel from './components/RightPanel';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import EditProfileModal from './components/EditProfileModal';
import MessagesModal from './components/MessagesModal';
import NotificationsModal from './components/NotificationsModal';
import CreatePostModal from './components/CreatePostModal';
import CreateStoryModal from './components/CreateStoryModal';
import FriendRequestsModal from './components/FriendRequestsModal';
import { User, Post, Notification, Story, FriendRequest } from './types';
import { generateSampleData } from './utils/sampleData';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  
  // Modal states
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showProfile, setShowProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Initialize sample data
  useEffect(() => {
    const { users: sampleUsers, posts: samplePosts, notifications: sampleNotifications, stories: sampleStories, friendRequests: sampleFriendRequests } = generateSampleData();
    setUsers(sampleUsers);
    setPosts(samplePosts);
    setNotifications(sampleNotifications);
    setStories(sampleStories);
    setFriendRequests(sampleFriendRequests);
  }, []);

  // Show auth modal if no user is logged in
  useEffect(() => {
    if (!currentUser) {
      setShowAuth(true);
    }
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setUsers(prev => {
      const existingIndex = prev.findIndex(u => u.id === user.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = user;
        return updated;
      }
      return [...prev, user];
    });
    setShowAuth(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowAuth(true);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setShowEditProfile(false);
  };

  const handleCreatePost = (postData: Partial<Post>) => {
    if (!currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content: postData.content || '',
      images: postData.images,
      video: postData.video,
      audio: postData.audio,
      type: postData.type || 'text',
      timestamp: new Date(),
      likes: 0,
      comments: [],
      shares: 0,
      views: 0,
      likedBy: [],
      sharedBy: [],
      tags: postData.tags || [],
      location: postData.location,
      privacy: postData.privacy || 'public',
      isPinned: false,
      isEdited: false
    };

    setPosts(prev => [newPost, ...prev]);
    setCurrentUser(prev => prev ? { ...prev, posts: prev.posts + 1 } : null);
    setShowCreatePost(false);
  };

  const handleCreateStory = (storyData: Partial<Story>) => {
    if (!currentUser) return;

    const newStory: Story = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content: storyData.content || '',
      image: storyData.image,
      video: storyData.video,
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      views: [],
      isHighlight: false
    };

    setStories(prev => [newStory, ...prev]);
    setShowCreateStory(false);
  };

  const handleLikePost = (postId: string) => {
    if (!currentUser) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(currentUser.id);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? post.likedBy.filter(id => id !== currentUser.id)
            : [...post.likedBy, currentUser.id]
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string, content: string) => {
    if (!currentUser) return;

    const newComment = {
      id: Date.now().toString(),
      postId,
      userId: currentUser.id,
      content,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      likedBy: [],
      isEdited: false
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  const handleSendFriendRequest = (toUserId: string) => {
    if (!currentUser) return;

    const newRequest: FriendRequest = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toUserId,
      status: 'pending',
      timestamp: new Date()
    };

    setFriendRequests(prev => [...prev, newRequest]);
    
    // Add notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      userId: toUserId,
      type: 'follow',
      fromUserId: currentUser.id,
      content: 'sent you a friend request',
      timestamp: new Date(),
      isRead: false
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  const handleAcceptFriendRequest = (requestId: string) => {
    setFriendRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));

    const request = friendRequests.find(req => req.id === requestId);
    if (request && currentUser) {
      // Update follower counts
      setUsers(prev => prev.map(user => {
        if (user.id === request.fromUserId) {
          return { ...user, following: user.following + 1 };
        }
        if (user.id === request.toUserId) {
          return { ...user, followers: user.followers + 1 };
        }
        return user;
      }));

      if (currentUser.id === request.toUserId) {
        setCurrentUser(prev => prev ? { ...prev, followers: prev.followers + 1 } : null);
      }
    }
  };

  const handleRejectFriendRequest = (requestId: string) => {
    setFriendRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ));
  };

  const openProfile = (user: User) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const openEditProfile = () => {
    setShowProfile(false);
    setShowEditProfile(true);
  };

  const getUserFriendRequestStatus = (userId: string) => {
    if (!currentUser) return 'none';
    
    const sentRequest = friendRequests.find(req => 
      req.fromUserId === currentUser.id && req.toUserId === userId
    );
    
    const receivedRequest = friendRequests.find(req => 
      req.fromUserId === userId && req.toUserId === currentUser.id
    );

    if (sentRequest) return sentRequest.status;
    if (receivedRequest) return 'received';
    return 'none';
  };
  const getVisibleStories = () => {
    if (!currentUser) return [];
    const friends = friendRequests
      .filter(req => 
        req.status === 'accepted' && 
        (req.fromUserId === currentUser.id || req.toUserId === currentUser.id)
      )
      .map(req => req.fromUserId === currentUser.id ? req.toUserId : req.fromUserId);

    // Include current user's stories and friends' stories
    return stories.filter(story => 
      story.userId === currentUser.id || friends.includes(story.userId)
    );
  };
  const pendingFriendRequests = friendRequests.filter(req => 
    req.toUserId === currentUser?.id && req.status === 'pending'
  );
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <AnimatePresence>
          {showAuth && (
            <AuthModal
              mode={authMode}
              onClose={() => {}} // Prevent closing when authentication is required
              onLogin={handleLogin}
              onSwitchMode={setAuthMode}
              users={users}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Header 
        currentUser={currentUser}
        onLogin={() => setShowAuth(true)}
        onLogout={handleLogout}
        onShowMessages={() => setShowMessages(true)}
        onShowNotifications={() => setShowNotifications(true)}
        onShowProfile={() => openProfile(currentUser)}
        onCreatePost={() => setShowCreatePost(true)}
        onShowFriendRequests={() => setShowFriendRequests(true)}
        notifications={notifications}
        pendingFriendRequests={pendingFriendRequests}
      />

      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <motion.div 
          className="hidden lg:block w-64 fixed left-0 top-16 h-full overflow-y-auto bg-white/80 backdrop-blur-xl border-r border-slate-200/50"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Sidebar 
            currentUser={currentUser}
            onShowCreatePost={() => setShowCreatePost(true)}
            onShowCreateStory={() => setShowCreateStory(true)}
          />
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 lg:mr-80">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <Feed
              currentUser={currentUser}
              posts={posts}
              users={users}
              stories={getVisibleStories()}
              onLikePost={handleLikePost}
              onComment={handleComment}
              onUserClick={openProfile}
              onCreatePost={() => setShowCreatePost(true)}
              onCreateStory={() => setShowCreateStory(true)}
            />
          </div>
        </div>

        {/* Right Panel */}
        <motion.div 
          className="hidden lg:block w-80 fixed right-0 top-16 h-full overflow-y-auto bg-white/80 backdrop-blur-xl border-l border-slate-200/50"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <RightPanel 
            currentUser={currentUser}
            users={users}
            onUserClick={openProfile}
            onSendFriendRequest={handleSendFriendRequest}
            getUserFriendRequestStatus={getUserFriendRequestStatus}
          />
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showProfile && selectedUser && (
          <ProfileModal
            user={selectedUser}
            currentUser={currentUser}
            posts={posts.filter(post => post.userId === selectedUser.id)}
            onClose={() => setShowProfile(false)}
            onEditProfile={selectedUser.id === currentUser.id ? openEditProfile : undefined}
            onSendFriendRequest={handleSendFriendRequest}
            friendRequestStatus={getUserFriendRequestStatus(selectedUser.id)}
          />
        )}

        {showEditProfile && currentUser && (
          <EditProfileModal
            user={currentUser}
            onClose={() => setShowEditProfile(false)}
            onSave={handleUpdateProfile}
          />
        )}

        {showMessages && (
          <MessagesModal
            currentUser={currentUser}
            users={users}
            onClose={() => setShowMessages(false)}
          />
        )}

        {showNotifications && (
          <NotificationsModal
            notifications={notifications}
            users={users}
            onClose={() => setShowNotifications(false)}
            onMarkAsRead={(id) => {
              setNotifications(prev => prev.map(notif => 
                notif.id === id ? { ...notif, isRead: true } : notif
              ));
            }}
          />
        )}

        {showCreatePost && (
          <CreatePostModal
            currentUser={currentUser}
            onClose={() => setShowCreatePost(false)}
            onCreatePost={handleCreatePost}
          />
        )}

        {showCreateStory && (
          <CreateStoryModal
            currentUser={currentUser}
            onClose={() => setShowCreateStory(false)}
            onCreateStory={handleCreateStory}
          />
        )}

        {showFriendRequests && (
          <FriendRequestsModal
            currentUser={currentUser}
            friendRequests={friendRequests}
            users={users}
            onClose={() => setShowFriendRequests(false)}
            onAccept={handleAcceptFriendRequest}
            onReject={handleRejectFriendRequest}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;