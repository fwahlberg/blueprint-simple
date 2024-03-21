import React from 'react';
import JoinGuestListForm from '../features/Guestlist/JoinGuestListForm'; // Ensure the path is correct
import image from '../image.jpg';

function JoinGuestlist() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8"> {/* Enhanced spacing around the card */}
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl overflow-hidden md:flex border border-gray-200"> {/* Added a subtle border for depth */}
        <div className="md:w-1/2 hidden md:block"> {/* Hide on small screens */}
          <img src={image} alt="Event" className="w-full h-full object-cover"/>
        </div>
        <div className="w-full md:w-1/2 flex content-center">
          <JoinGuestListForm />
          
        </div>
      </div>
    
    </div>
  );
}

export default JoinGuestlist;
