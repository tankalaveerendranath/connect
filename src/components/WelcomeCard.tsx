import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, TrendingUp, Shield } from 'lucide-react';

interface WelcomeCardProps {
  onCreatePost: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onCreatePost }) => {
  const features = [
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with industry professionals and expand your network'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Messaging',
      description: 'Communicate instantly with your connections'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Discover opportunities and showcase your expertise'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is secure with enterprise-grade protection'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <span className="text-3xl font-bold">S</span>
        </motion.div>
        
        <h1 className="text-4xl font-bold mb-4">Welcome to ConnectSphere</h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          The professional social media platform designed for modern professionals.
          Connect, collaborate, and grow your career in a secure environment.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreatePost}
          className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all duration-200"
        >
          Sign Up to Get Started
        </motion.button>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50"
      >
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
          Join Thousands of Professionals
        </h2>
        
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-slate-600">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
            <div className="text-slate-600">Connections Made</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">25K+</div>
            <div className="text-slate-600">Companies</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeCard;