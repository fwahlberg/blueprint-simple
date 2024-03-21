// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import styles from './LandingPage.module.css';
// import queue from '../undraw_wait_in_line_o2aq.svg'
// function LandingPage() {
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   // Function to navigate to the Sign Up page
//   const handleSignUpClick = () => {
//     navigate('/signup'); // Assuming '/signup' is the path for your Sign Up page
//   };

//   // Function to navigate to the Login page
//   const handleLoginClick = () => {
//     navigate('/login'); // Assuming '/login' is the path for your Login page
//   };

//   return (
//     <div className={styles.landingPage}>

// <section className="text-gray-600 body-font">
//   <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
//     <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
//       <img class="object-cover object-center rounded" alt="hero" src={queue} />
//     </div>
//     <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
//       <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
//         Guestlists Redefined
//       </h1>
//       <p className="mb-8 leading-relaxed">
//         Skip the lines, forget the hassle of physical tickets, and embrace the convenience of modern guestlists. Your entry, your way.
//       </p>
//       <div className="flex justify-center">
//         <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
//           Get Started
//         </button>
//         <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
//           Learn More
//         </button>
//       </div>
//     </div>
//   </div>
// </section>

// {/* <!-- Testimonials Section --> */}
// <section class="text-gray-600 body-font">
//   {/* <!-- ... Your testimonials ... --> */}
// </section>

// {/* <!-- Pricing Section --> */}
// <section class="text-gray-600 body-font">
//   {/* <!-- ... Your pricing ... --> */}
// </section>

// {/* <!-- CTA Section --> */}
// <section className="text-gray-600 body-font">
//       <div className="container px-5 py-24 mx-auto text-center">
//         <h2 className="text-2xl font-medium text-gray-900 title-font mb-4">
//           Ready to start your guestlist?
//         </h2>
//         <p className="text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
//           Create an interactive guest list for your event in just a few clicks and make your event management effortless and efficient.
//         </p>
//         <div className="mt-6">
//           <button

//             className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//             type="button"
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//     </section>

//     </div>
//   );
// }

// export default LandingPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import queue from "../undraw_wait_in_line_o2aq.svg";

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/signup");
  };

  const handleLearnMoreClick = () => {
    navigate("/about");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto flex px-5 py-24 items-center justify-center flex-col md:flex-row">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={queue}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 flex flex-col items-center md:items-start md:text-left">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Guestlists Redefined
          </h1>
          <p className="mb-8 leading-relaxed">
            Skip the lines, forget the hassle of physical tickets, and embrace
            the convenience of modern guestlists. Your entry, your way.
          </p>
          <div className="flex w-full justify-center md:justify-start">
            <button
              onClick={handleGetStartedClick}
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Get Started
            </button>
            <button
              onClick={handleLearnMoreClick}
              className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Features Section --> */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Why Choose Our Guestlist?
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              No tickets, no hassle. Just seamless entry management.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {/* Feature 1 */}
            <div className="p-4 md:w-1/3">
              <div className="h-full bg-white p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Efficient Check-ins
                </h2>
                <p className="leading-relaxed text-base">
                  Speedy entry with QR codes. No more long lines or paper lists.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="p-4 md:w-1/3">
              <div className="h-full bg-white p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Real-Time Updates
                </h2>
                <p className="leading-relaxed text-base">
                  Stay updated with live headcounts and guest information.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="p-4 md:w-1/3">
              <div className="h-full bg-white p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Eco-Friendly
                </h2>
                <p className="leading-relaxed text-base">
                  Go green by reducing the need for printed materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Testimonials content */}

      {/* Pricing Section */}
      {/* Pricing content */}

      {/* CTA Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto text-center">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-4">
            Ready to start your guestlist?
          </h2>
          <p className="text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            Create an interactive guest list for your event in just a few clicks
            and make your event management effortless and efficient.
          </p>
          <div className="mt-6">
            <button
              onClick={handleGetStartedClick}
              className="bg-indigo-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
