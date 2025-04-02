import React from 'react';
import Footer from '../components/Organisms/Footer';
import { Outlet } from 'react-router-dom';
import Header from '../components/Organisms/Header';
import TopButton from '../components/Atoms/TopButton';

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
