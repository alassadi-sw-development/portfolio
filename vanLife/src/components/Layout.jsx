import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Layout({isLoggedIn, handleLogOutStatus}) {
  
  return (
    <div className="site-wrapper">
      <Header isLoggedIn={isLoggedIn} handleLogOutStatus={handleLogOutStatus} />
      <main>
          <Outlet />
      </main>
      <Footer />
</div>
  );
}

export default Layout;