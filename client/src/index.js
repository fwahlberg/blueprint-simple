import React from "react";
import ReactDOM from "react-dom/client";
import './assets/main.css'
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JoinGuestlist from "./pages/JoinGuestlist";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import NewGuestlistPage from "./pages/NewGuestlist";
import Layout from "./layouts/Layout";
import GuestlistDetailsPage from "./pages/GuestlistDetails";
import GuestlistsPage from "./pages/Gueslists";
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from "./pages/ErrorPage";
import Example from "./pages/DarkNav";
import SlideOver from "./pages/SlidOver";
import Login from "./pages/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/signup",
        element: <AuthPage />,
      },
     
      {
        path: "/new-guestlist",
        element: <NewGuestlistPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/join",
        element: <JoinGuestlist />,
      },
      {
        path: '/guestlists',
        element: <GuestlistsPage />,
      },
      {
        path: '/guestlists/:guestListId',
        element: <GuestlistDetailsPage />,
      },
    ],
  },
  {
    path: "/join/:inviteCode",
    element: <JoinGuestlist />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/darknav",
    element: <Example />,
  },
  {
    path: "/slideover",
    element: <SlideOver />,
  },
  
 
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
