import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import {
  useFetchGuestlistByIdQuery,
  useUpdateGuestArrivalMutation,
} from "../services/api";
import { toast } from "react-toastify";

const GuestlistDetailsPage = () => {
  const { guestListId } = useParams();
  const {
    data: guestlist,
    error,
    isLoading,
    refetch,
  } = useFetchGuestlistByIdQuery(guestListId);

  const [updateGuestArrival] = useUpdateGuestArrivalMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentType, setModalContentType] = useState("");
  const [currentGuestId, setCurrentGuestId] = useState(null);
  const [currentPlusOnes, setCurrentPlusOnes] = useState(0);
  const [inviteLink, setInviteLink] = useState("");

  const handleOpenModal = (guestId, plusOnes) => {
    setCurrentGuestId(guestId);
    setCurrentPlusOnes(plusOnes);
    setModalContentType("arrival");
    setIsModalOpen(true);
  };

  const handleArrival = async () => {
    try {
      await updateGuestArrival({
        guestId: currentGuestId,
        plusOnesArrived: currentPlusOnes,
      }).unwrap();
      setIsModalOpen(false);
      refetch(); // Refetch guestlist data to update UI
      toast.success("Guest arrival marked successfully");
    } catch (error) {
      console.error("Failed to mark arrival:", error);
      toast.error("Failed to mark arrival");
    }
  };

  const handleCopyInviteLink = async () => {
    const link = `${window.location.origin}/join/${guestlist.inviteCode}`;
    setInviteLink(link);
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Invite link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy the invite link. Please copy it manually.");
      setModalContentType("invite");
      setIsModalOpen(true); // Open modal for manual copying on failure
    }
  };

  if (isLoading)
    return <div className="text-center">Loading guestlist details...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center">
        Error fetching guestlist: {error.message}
      </div>
    );

  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {guestlist.title}
        </h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={handleCopyInviteLink}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Invite Guests
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Guests:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guestlist.guests.map((guest) => (
          <div
            key={guest._id}
            className="bg-white rounded-lg shadow overflow-hidden space-between flex flex-col justify-between"
          >
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-900">
                {guest.fullName}
              </p>
              <p className="text-gray-700">{guest.email}</p>
            </div>
            <div className="bg-gray-100 p-4 flex justify-between justify-self-end items-center">
              {guest.hasArrived ? (
                <span className="text-green-600 py-2">Arrived</span>
              ) : (
                <button
                  onClick={() => handleOpenModal(guest._id, guest.plusOnes)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Mark as Arrived
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            {modalContentType === "arrival" ? (
              <>
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Mark Arrival
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Enter the number of plus ones arrived:
                  </p>
                  <input
                    type="number"
                    className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={currentPlusOnes}
                    onChange={(e) =>
                      setCurrentPlusOnes(parseInt(e.target.value, 10))
                    }
                    min="0"
                    max={
                      guestlist.guests.find(
                        (guest) => guest._id === currentGuestId
                      )?.plusOnes || 0
                    }
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={handleArrival}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <>
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Copy Invite Link
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Manually copy the invite link below:
                  </p>
                  <input
                    type="text"
                    readOnly
                    className="w-full mt-2 p-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={inviteLink}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default GuestlistDetailsPage;
