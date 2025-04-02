import React from 'react';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <p>
        Copyright © {new Date().getFullYear()} - All right reserved by 김혜란,
        박세진, 형주희, 최승이
      </p>
    </footer>
  );
};

export default Footer;
