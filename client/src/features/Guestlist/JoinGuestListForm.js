import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InviteCodeInput from "../../components/form/InviteCodeInput";
import TextInput from "../../components/form/TextInput";
import PlusOnesControl from "./PlusOnesControl";
import FormMessage from "../../components/form/FormMessage";
import SuccessIndicator from "../../components/form/SuccessIndicator";
import "./JoinGuestListForm.css"; // Import the CSS file for animations

function JoinGuestListForm({ onJoinSuccess, onJoinFailure }) {
  const { inviteCode: initialInviteCode } = useParams();
  const [inviteCode, setInviteCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [plusOnes, setPlusOnes] = useState(0);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [guestlistTitle, setGuestlistTitle] = useState("");

  useEffect(() => {
    if (initialInviteCode) {
      setInviteCode(initialInviteCode);
      fetchGuestListTitle(initialInviteCode);
    }
  }, [initialInviteCode]);

  const fetchGuestListTitle = async (code) => {
    try {
      const response = await axios.get(`/api/guestlists/find/${code}`);
      setGuestlistTitle(response?.data.title);
      document.title = `Joining ${response.data.title}`;
    } catch (error) {
      setMessage("Failed to fetch guest list details.");
      document.title = "Join Guest List";
    }
  };

  const validateForm = () => {
    let isValid = true;
    setFullNameError("");
    setEmailError("");

    if (!fullName.trim()) {
      setFullNameError("Full Name is required");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    }

    return isValid;
  };

  const handlePlusOnesChange = (newValue) => {
    setPlusOnes(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      await axios.post(`/api/guestlists/join/${inviteCode}`, {
        fullName,
        email,
        phoneNumber,
        plusOnes,
      });
      setMessage("Successfully joined the guest list!");
      setShowSuccess(true); // Show success indicator

      if (onJoinSuccess) onJoinSuccess();
    } catch (error) {
      setMessage(error.response?.data.message || "An error occurred");
      if (onJoinFailure) onJoinFailure(error);
    }
  };
  if (showSuccess) {
    // If user has joined, display success message and indicator instead of the form
    return (
      <div className="max-w-xl w-full mx-auto bg-white p-6 text-center content-center animate-slideIn">
        <SuccessIndicator />
        <h2 className="text-xl font-semibold text-gray-800 my-4">{message}</h2>
        <div class="mt-10">
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm font-medium leading-6">
            
            </div>
          </div>
          <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Want to pay now to save time on the door?</h2>
          <div class="mt-6 grid grid-cols-1 gap-4">
   

            <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
              {/* <svg class="h-5 w-5 fill-[#24292F]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
              </svg> */}
              <span class="text-sm font-semibold leading-6">Pay Now</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <form
      className={`max-w-xl w-full mx-auto bg-white p-6 ${
        showSuccess && "animate-slideOut"
      } `}
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">
        Join the Guest List
      </h2>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {guestlistTitle}
      </h2>
      {!initialInviteCode && (
        <InviteCodeInput
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          onBlur={() => fetchGuestListTitle(inviteCode)}
        />
      )}
      {message && <FormMessage message={message} />}
      <TextInput
        id="fullName"
        label="Full Name"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        errorMessage={fullNameError}
        style="mb-2"
        required
      />
      <TextInput
        id="email"
        type="email"
        label="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={emailError}
        style="mb-2"
        required
      />
      <TextInput
        id="phoneNumber"
        label="Phone Number (Optional)"
        placeholder="Phone Number (Optional)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style="mb-2"
      />
      <PlusOnesControl
        value={plusOnes}
        onChange={handlePlusOnesChange} // Pass the updated handler
      />
      <button
        type="submit"
        className="mt-4 w-full bg-neutral-950 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Join
      </button>
      <p className="text-sm text-gray-600 mt-4">
        By joining the guest list, you agree to our{" "}
        <a href="/privacy-policy" className="text-blue-500">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/terms-of-service" className="text-blue-500">
          Terms of Service
        </a>
        . We value your privacy and will not share your information without
        consent.
      </p>
    </form>
  );
}

export default JoinGuestListForm;
