import React, { useState, useEffect } from 'react';
import { IoArrowUp } from 'react-icons/io5';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-10 bottom-6 flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-600 dark:text-white rounded-full shadow-md opacity-0 z-50 transition-opacity duration-300 ease-in-out ${showButton ? 'opacity-100' : 'opacity-0'} cursor-pointer`}>
      <IoArrowUp className="text-xl" />
    </button>
  );
};

export default TopButton;
