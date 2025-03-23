import React from 'react';
import Footer from '../components/base/Footer';
import { Outlet } from 'react-router-dom';
import Header from '../components/base/header/Header';
import TopButton from '../components/common/TopButton';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <TopButton />

      <main className="flex-1 pt-[64px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
