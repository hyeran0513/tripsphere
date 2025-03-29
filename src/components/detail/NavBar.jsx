import React, { useEffect, useState } from 'react';

const NavBar = ({ tabRef }) => {
  const sections = [
    { id: 'overview', label: '개요' },
    { id: 'rooms', label: '객실' },
    { id: 'services', label: '숙소 소개' },
    { id: 'location', label: '위치' },
    { id: 'reviews', label: '리뷰' },
  ];

  const [currentTab, setCurrentTab] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed border-b border-gray-200 top-[64px] left-0 w-full bg-white transition-transform duration-300 
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ zIndex: 90 }}>
      <div className="flex gap-12 p-4 mx-auto w-[1200px]">
        {sections.map(({ id, label }, index) => (
          <a
            key={id}
            href={`#${id}`}
            className={`text-sm font-semibold text-gray-400 ${tabRef.current[index] === currentTab ? 'text-indigo-500' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              const offset = tabRef.current[index]?.offsetTop;
              if (offset !== undefined) {
                window.scrollTo({
                  top: offset - 90,
                  behavior: 'smooth',
                });
                setCurrentTab(tabRef.current[index]);
              }
            }}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
