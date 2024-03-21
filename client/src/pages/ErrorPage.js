import React from 'react';
import { Link } from 'react-router-dom';

import image from '../character_crying_transparent_bg.png';

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-6xl font-medium text-gray-700 mb-4">Screaming. Crying. Throwing up.</p>
      <p className="text-lg text-gray-600">We searched high and low but couldn't find what you're looking for.</p>
      <img src={image} alt="Funny or creative image related to the error" className="max-w-xs mt-4" />
      <Link to="/" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Return Home
      </Link>
    </div>
  );
};

export default ErrorPage;
