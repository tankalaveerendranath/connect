export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  location?: string;
  website?: string;
  company?: string;
  position?: string;
  followers: number;
  following: number;
  posts: number;
  isOnline: boolean;
  isVerified: boolean;
  joinedDate: Date;
  lastActive: Date;
  privacy: 'public' | 'private' | 'friends';
  interests: string[];
  skills: string[];
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  video?: string;
  audio?: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'poll' | 'event' | 'article';
  timestamp: Date;
  likes: number;
  comments: Comment[];
  shares: number;
  views: number;
  likedBy: string[];
  sharedBy: string[];
  tags: string[];
  location?: string;
  privacy: 'public' | 'private' | 'friends';
  isPinned: boolean;
  isEdited: boolean;
  editedAt?: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Reply[];
  likedBy: string[];
  isEdited: boolean;
  editedAt?: Date;
}

export interface Reply {
  id: string;
  commentId: string;
  userId: string;
  content: string;
  timestamp: Date;
  likes: number;
  likedBy: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'voice';
  timestamp: Date;
  isRead: boolean;
  isEdited: boolean;
  editedAt?: Date;
  replyTo?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  type: 'direct' | 'group';
  name?: string;
  avatar?: string;
  lastMessage?: Message;
  unreadCount: number;
  isArchived: boolean;
  isMuted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'message' | 'share';
  fromUserId: string;
  postId?: string;
  commentId?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

export interface Story {
  id: string;
  userId: string;
  content: string;
  image?: string;
  video?: string;
  timestamp: Date;
  expiresAt: Date;
  views: string[];
  isHighlight: boolean;
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: Date;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  coverImage?: string;
  members: string[];
  admins: string[];
  privacy: 'public' | 'private' | 'secret';
  category: string;
  createdAt: Date;
  posts: Post[];
  rules?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image?: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isVirtual: boolean;
  virtualLink?: string;
  organizerId: string;
  attendees: string[];
  interested: string[];
  privacy: 'public' | 'private';
  category: string;
  tags: string[];
}