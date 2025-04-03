import React from 'react';
import { motion } from 'framer-motion';
import Filter from '../components/Molecules/Filter';

const sentence = 'TRIPSPHERE와 함께 꿈의 여행을 떠나세요'.split('');

const Home = () => {
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col justify-center px-6 py-12 lg:px-8 bg-[url(/banner.jpg)] bg-no-repeat bg-cover bg-center">
      <div className="mx-auto max-w-[1000px]">
        <motion.div
          className="hidden sm:mb-8 sm:flex sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}>
          <div className="bg-black/20 rounded-full px-3 py-1 text-sm text-gray-100 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            TRIPSPHERE와 함께하는 특별한 여행
          </div>
        </motion.div>

        <motion.p
          className="text-4xl font-semibold tracking-tight text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}>
          {sentence.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}>
              {char}
            </motion.span>
          ))}
        </motion.p>

        <Filter />
      </div>
    </div>
  );
};

export default Home;
