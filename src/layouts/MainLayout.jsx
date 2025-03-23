import React from 'react';
import Footer from '../components/base/Footer';
import { Outlet } from 'react-router-dom';
import Header from '../components/base/header/Header';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-[64px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
