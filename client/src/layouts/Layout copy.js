import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { selectIsUserLoggedIn } from '../features/Auth/authSlice'; // Adjust the import path as necessary
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 ">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2024 My Application. All rights reserved.</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Layout;
