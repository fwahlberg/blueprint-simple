import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { selectIsUserLoggedIn } from "../features/Auth/authSlice"; // Adjust the import path as necessary
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return (
    <div className="min-h-full">
      <Navbar />
      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
           <Outlet />
          </div>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
};

export default Layout;
