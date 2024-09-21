import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-[650px] flex flex-col justify-center items-center">
      <motion.div
        className="flex items-center space-x-4 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <CheckSquare className="h-12 w-12 text-green-400" />
        <h1 className="text-5xl font-bold text-gray-100">Welcome to Todo App</h1>
      </motion.div>

      <motion.p
        className="text-lg text-gray-400 mb-10 max-w-2xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Your one-stop solution for managing your tasks effortlessly. Organize, track, and complete your tasks with ease using our simple and efficient Todo App.
      </motion.p>

      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      >
        <Link
          to="/todos"
          className="px-6 py-3 bg-green-400 text-gray-900 rounded-md font-semibold hover:bg-green-300 transition duration-300 ease-in-out"
        >
           Get Started {/*  change to login page */}
        </Link>
      </motion.div>
    </div>
  );
}
