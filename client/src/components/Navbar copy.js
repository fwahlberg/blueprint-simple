import React, {Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { selectIsUserLoggedIn, selectUserName, logout } from '../features/Auth/authSlice';
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { Disclosure, Menu, Transition } from '@headlessui/react';

const Navbar = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const userName = useSelector(selectUserName);

 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? <HiX className="block h-6 w-6" aria-hidden="true" /> : <HiMenu className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-xl font-bold text-white">Blueprint</Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}>
                      Home
                    </NavLink>
                    <NavLink to="/guestlists" className={({ isActive }) => isActive ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'}>
                      Guestlists
                    </NavLink>
                  </div>
                </div>
              </div>
              {isUserLoggedIn ? (
               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
               <Menu as="div" className="ml-3 relative">
                 <div>
                   <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                     <span className="sr-only">Open user menu</span>
                     <span className="text-white font-medium px-3 py-2">{userName}</span>
                     <HiChevronDown className="h-5 w-5 text-white" aria-hidden="true" />
                   </Menu.Button>
                 </div>
                 <Transition
                   as={Fragment}
                   enter="transition ease-out duration-100"
                   enterFrom="transform opacity-0 scale-95"
                   enterTo="transform opacity-100 scale-100"
                   leave="transition ease-in duration-75"
                   leaveFrom="transform opacity-100 scale-100"
                   leaveTo="transform opacity-0 scale-95"
                 >
                   <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                     <Menu.Item>
                       {({ active }) => (
                         <Link
                           to="/profile"
                           className={`${
                             active ? 'bg-gray-100' : ''
                           } block px-4 py-2 text-sm text-gray-700`}
                         >
                           Your Profile
                         </Link>
                       )}
                     </Menu.Item>
                     <Menu.Item>
                       {({ active }) => (
                         <button
                           onClick={handleLogout}
                           className={`${
                             active ? 'bg-gray-100' : ''
                           } w-full text-left block px-4 py-2 text-sm text-gray-700`}
                         >
                           Logout
                         </button>
                       )}
                     </Menu.Item>
                   </Menu.Items>
                 </Transition>
               </Menu>
             </div>
              ) : (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link to="/signup" className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink to="/" className={({ isActive }) => isActive ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'}>
                Home
              </NavLink>
              <NavLink to="/guestlists" className={({ isActive }) => isActive ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'}>
                Guestlists
              </NavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
