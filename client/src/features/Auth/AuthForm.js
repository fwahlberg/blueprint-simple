import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation} from '../../services/auth'; // Adjust this if you have separate login and register mutations
import { setCredentials } from './authSlice';
import TextInput from '../../components/form/TextInput'; // Adjust if necessary
import styles from './AuthForm.module.css'; // Adjust the path as necessary

const AuthForm = ({ isSignUp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
//   const [login, { isLoading: isLoggingIn }] = useLoginMutation(); // Adjust based on your setup

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
      ...(isSignUp && { fullName: `${firstName} ${lastName}` }),
    };

    try {
      const result = await register(user).unwrap() 
      dispatch(setCredentials({ user: result.user, token: result.token }));
      navigate('/'); // Redirect to home page or dashboard after successful auth
    } catch (err) {
      setError(err.data?.message || "An error occurred during authentication.");
    }
  };

  return (
    <div className={styles['auth-container']}>{/* Apply or adjust your container class for styling */}
      <form onSubmit={handleSubmit} className={styles['auth-form']}>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        {isSignUp && (
          <>
            <TextInput
              id="firstName"
              label="First Name"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextInput
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
        )}
        <TextInput
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles['button']} type="submit" disabled={false}>
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>
      {error && <p className={styles['error-message']}>{error}</p>} {/* Consider styling for error messages */}
    </div>
  );
};

export default AuthForm;
