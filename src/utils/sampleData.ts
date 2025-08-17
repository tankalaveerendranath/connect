import { User, Post, Notification, Story, FriendRequest } from '../types';

export const generateSampleData = () => {
  const users: User[] = [
    {
      id: '1',
      username: 'alexchen',
      email: 'alex@techcorp.com',
      firstName: 'Alex',
      lastName: 'Chen',
      displayName: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Senior UX Designer passionate about creating meaningful digital experiences. Love coffee, design systems, and user research.',
      location: 'San Francisco, CA',
      website: 'https://alexchen.design',
      company: 'TechCorp',
      position: 'Senior UX Designer',
      followers: 2847,
      following: 892,
      posts: 156,
      isOnline: true,
      isVerified: true,
      joinedDate: new Date('2022-03-15'),
      lastActive: new Date(),
      privacy: 'public',
      interests: ['Design', 'Technology', 'Coffee', 'Travel'],
      skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping']
    },
    {
      id: '2',
      username: 'sarahkim',
      email: 'sarah@startup.io',
      firstName: 'Sarah',
      lastName: 'Kim',
      displayName: 'Sarah Kim',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Product Manager building the future of fintech. Former consultant, current startup enthusiast. Always learning.',
      location: 'New York, NY',
      website: 'https://sarahkim.co',
      company: 'FinTech Startup',
      position: 'Product Manager',
      followers: 1923,
      following: 567,
      posts: 89,
      isOnline: false,
      isVerified: false,
      joinedDate: new Date('2022-07-22'),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      privacy: 'public',
      interests: ['Product Management', 'Fintech', 'Startups', 'Reading'],
      skills: ['Product Strategy', 'Data Analysis', 'Agile', 'Leadership']
    },
    {
      id: '3',
      username: 'mikejohnson',
      email: 'mike@devstudio.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      displayName: 'Mike Johnson',
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Full-stack developer and tech lead. Building scalable web applications with modern technologies. Open source contributor.',
      location: 'Austin, TX',
      company: 'DevStudio',
      position: 'Senior Software Engineer',
      followers: 3156,
      following: 1234,
      posts: 203,
      isOnline: true,
      isVerified: true,
      joinedDate: new Date('2021-11-08'),
      lastActive: new Date(),
      privacy: 'public',
      interests: ['Programming', 'Open Source', 'Gaming', 'Music'],
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker']
    },
    {
      id: '4',
      username: 'emilydavis',
      email: 'emily@marketing.co',
      firstName: 'Emily',
      lastName: 'Davis',
      displayName: 'Emily Davis',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Digital marketing strategist helping brands tell their stories. Content creator, social media expert, and coffee addict.',
      location: 'Los Angeles, CA',
      company: 'Marketing Co',
      position: 'Marketing Director',
      followers: 4521,
      following: 2103,
      posts: 312,
      isOnline: true,
      isVerified: true,
      joinedDate: new Date('2022-01-12'),
      lastActive: new Date(),
      privacy: 'public',
      interests: ['Marketing', 'Content Creation', 'Photography', 'Travel'],
      skills: ['Digital Marketing', 'Content Strategy', 'SEO', 'Analytics']
    },
    {
      id: '5',
      username: 'davidwilson',
      email: 'david@consulting.com',
      firstName: 'David',
      lastName: 'Wilson',
      displayName: 'David Wilson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Management consultant specializing in digital transformation. Helping organizations adapt to the digital age.',
      location: 'Chicago, IL',
      company: 'Strategy Consulting',
      position: 'Senior Consultant',
      followers: 1876,
      following: 743,
      posts: 127,
      isOnline: false,
      isVerified: false,
      joinedDate: new Date('2022-05-30'),
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000),
      privacy: 'public',
      interests: ['Strategy', 'Digital Transformation', 'Leadership', 'Innovation'],
      skills: ['Strategy', 'Change Management', 'Data Analysis', 'Presentation']
    },
    {
      id: '6',
      username: 'jessicawang',
      email: 'jessica@creative.com',
      firstName: 'Jessica',
      lastName: 'Wang',
      displayName: 'Jessica Wang',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Creative director with a passion for visual storytelling. Bringing brands to life through innovative design solutions.',
      location: 'Seattle, WA',
      company: 'Creative Agency',
      position: 'Creative Director',
      followers: 3421,
      following: 1567,
      posts: 245,
      isOnline: true,
      isVerified: true,
      joinedDate: new Date('2021-09-12'),
      lastActive: new Date(),
      privacy: 'public',
      interests: ['Design', 'Art', 'Photography', 'Innovation'],
      skills: ['Creative Direction', 'Brand Strategy', 'Visual Design', 'Team Leadership']
    }
  ];

  const posts: Post[] = [
    {
      id: '1',
      userId: '1',
      content: 'Just finished working on an amazing new design system for our mobile app! The process of creating consistent, accessible components has been incredibly rewarding. Sometimes the best solutions come from the most unexpected places. 🎨✨\n\nWhat\'s your favorite part about design systems?',
      images: ['https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500'],
      type: 'image',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 47,
      comments: [
        {
          id: '1',
          postId: '1',
          userId: '2',
          content: 'This looks incredible! Love the attention to detail in the component library.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 5,
          replies: [],
          likedBy: ['1', '3'],
          isEdited: false
        },
        {
          id: '2',
          postId: '1',
          userId: '3',
          content: 'The consistency across components is impressive. How long did this take to build?',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          likes: 2,
          replies: [],
          likedBy: ['1'],
          isEdited: false
        }
      ],
      shares: 12,
      views: 234,
      likedBy: ['2', '3', '4'],
      sharedBy: ['2'],
      tags: ['design', 'ui', 'designsystem'],
      location: 'San Francisco, CA',
      privacy: 'public',
      isPinned: false,
      isEdited: false
    },
    {
      id: '2',
      userId: '2',
      content: 'Excited to share some insights from our latest product launch! 🚀\n\nKey learnings:\n• User feedback is invaluable during beta testing\n• Iterative development leads to better outcomes\n• Cross-functional collaboration is essential\n\nWhat strategies have worked best for your product launches?',
      type: 'text',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 89,
      comments: [
        {
          id: '3',
          postId: '2',
          userId: '1',
          content: 'Great insights! We\'ve found that early user testing saves so much time in the long run.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          likes: 8,
          replies: [],
          likedBy: ['2', '3', '4'],
          isEdited: false
        },
        {
          id: '4',
          postId: '2',
          userId: '4',
          content: 'The cross-functional collaboration point is so important. Marketing and product need to be aligned from day one.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          likes: 6,
          replies: [],
          likedBy: ['1', '2'],
          isEdited: false
        }
      ],
      shares: 23,
      views: 456,
      likedBy: ['1', '3', '4', '5'],
      sharedBy: ['1', '4'],
      tags: ['product', 'launch', 'strategy'],
      privacy: 'public',
      isPinned: false,
      isEdited: false
    },
    {
      id: '3',
      userId: '3',
      content: 'Just deployed a new feature using React 18 and the new concurrent features! The performance improvements are incredible. 🔥\n\nThe automatic batching and startTransition API have made our app so much smoother. If you haven\'t explored React 18 yet, I highly recommend it.\n\nHere\'s a quick demo of the loading states:',
      images: [
        'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=500',
        'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500'
      ],
      type: 'image',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 156,
      comments: [
        {
          id: '5',
          postId: '3',
          userId: '1',
          content: 'This is awesome! The loading states look so smooth. Mind sharing the code?',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          likes: 12,
          replies: [],
          likedBy: ['2', '3', '4', '5'],
          isEdited: false
        }
      ],
      shares: 34,
      views: 789,
      likedBy: ['1', '2', '4', '5'],
      sharedBy: ['1', '2', '5'],
      tags: ['react', 'javascript', 'webdev'],
      location: 'Austin, TX',
      privacy: 'public',
      isPinned: true,
      isEdited: false
    },
    {
      id: '4',
      userId: '4',
      content: 'Content marketing in 2024: It\'s not just about creating content anymore, it\'s about creating experiences. 📱✨\n\nOur latest campaign saw a 300% increase in engagement by focusing on:\n• Interactive storytelling\n• User-generated content\n• Community building\n• Authentic brand voice\n\nWhat content strategies are working for you this year?',
      images: ['https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=500'],
      type: 'image',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 203,
      comments: [
        {
          id: '6',
          postId: '4',
          userId: '2',
          content: 'The user-generated content approach is brilliant! We\'ve seen similar results.',
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
          likes: 15,
          replies: [],
          likedBy: ['1', '3', '4', '5'],
          isEdited: false
        },
        {
          id: '7',
          postId: '4',
          userId: '5',
          content: 'Interactive storytelling is the future. Great insights!',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          likes: 8,
          replies: [],
          likedBy: ['1', '2', '4'],
          isEdited: false
        }
      ],
      shares: 45,
      views: 1234,
      likedBy: ['1', '2', '3', '5'],
      sharedBy: ['2', '3'],
      tags: ['marketing', 'content', 'strategy'],
      location: 'Los Angeles, CA',
      privacy: 'public',
      isPinned: false,
      isEdited: false
    },
    {
      id: '5',
      userId: '5',
      content: 'Digital transformation isn\'t just about technology—it\'s about people. 👥\n\nAfter working with dozens of organizations, the most successful transformations happen when:\n• Leadership is fully committed\n• Employees are involved in the process\n• Change is implemented gradually\n• Culture evolves alongside technology\n\nWhat\'s been your experience with digital transformation?',
      type: 'text',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      likes: 67,
      comments: [
        {
          id: '8',
          postId: '5',
          userId: '1',
          content: 'Absolutely agree! The human element is often overlooked in digital transformation.',
          timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000),
          likes: 4,
          replies: [],
          likedBy: ['2', '5'],
          isEdited: false
        }
      ],
      shares: 18,
      views: 345,
      likedBy: ['1', '2', '3', '4'],
      sharedBy: ['1'],
      tags: ['transformation', 'leadership', 'change'],
      location: 'Chicago, IL',
      privacy: 'public',
      isPinned: false,
      isEdited: false
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      userId: '1',
      type: 'like',
      fromUserId: '2',
      postId: '1',
      content: 'liked your post about design systems',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false
    },
    {
      id: '2',
      userId: '1',
      type: 'comment',
      fromUserId: '3',
      postId: '1',
      commentId: '2',
      content: 'commented on your post',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      isRead: false
    },
    {
      id: '3',
      userId: '1',
      type: 'follow',
      fromUserId: '4',
      content: 'sent you a friend request',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: '4',
      userId: '1',
      type: 'share',
      fromUserId: '5',
      postId: '3',
      content: 'shared your post about React 18',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true
    }
  ];

  const stories: Story[] = [
    {
      id: '1',
      userId: '2',
      content: 'Working late on the new product features! 💻',
      image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=300',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
      views: ['1', '3', '4'],
      isHighlight: false
    },
    {
      id: '2',
      userId: '3',
      content: 'Coffee and code ☕',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000),
      views: ['1', '2', '4', '5'],
      isHighlight: false
    },
    {
      id: '3',
      userId: '4',
      content: 'Behind the scenes of our latest campaign 📸',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000),
      views: ['1', '2', '3'],
      isHighlight: true
    },
    {
      id: '4',
      userId: '6',
      content: 'New creative project in progress! 🎨',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000),
      views: ['1', '2', '3', '4'],
      isHighlight: false
    }
  ];

  const friendRequests: FriendRequest[] = [
    {
      id: '1',
      fromUserId: '2',
      toUserId: '1',
      status: 'pending',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      fromUserId: '3',
      toUserId: '1',
      status: 'accepted',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      fromUserId: '4',
      toUserId: '1',
      status: 'accepted',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000)
    },
    {
      id: '4',
      fromUserId: '6',
      toUserId: '1',
      status: 'pending',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ];

  return { users, posts, notifications, stories, friendRequests };
};