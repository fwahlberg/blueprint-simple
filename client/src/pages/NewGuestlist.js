import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateGuestlistMutation } from "../services/api";

const NewGuestlistPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createGuestlist, { isLoading, isSuccess, isError, error }] = useCreateGuestlistMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/guestlists"); // Redirect to guestlists page or profile page
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGuestlist({ title, description });
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Create New Guestlist</h2>
        <p className="text-gray-600">Fill in the details below to add a new guestlist.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isLoading ? 'Creating...' : 'Create Guestlist'}
        </button>
        {isError && <p className="mt-4 text-sm text-red-500">{error.message}</p>}
      </form>
    </>
  );
};

export default NewGuestlistPage;
