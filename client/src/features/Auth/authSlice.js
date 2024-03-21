import { createSlice } from '@reduxjs/toolkit';

const getUserFromStorage = () => {
    const userDetails = localStorage.getItem('user');
    return userDetails ? JSON.parse(userDetails) : null;
  };
// Enhanced initialState to include user information
const initialState = {
    token: localStorage.getItem('token') || null,
    user: getUserFromStorage() || null // Retrieve user details from localStorage on initial load
  };
  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); // Store user details as a string in localStorage
          },
      logout: (state) => {
        state.token = null;
        state.user = null; // Clear user details on logout
        localStorage.removeItem('token');
        // Optionally, clear stored user details from localStorage or elsewhere if needed
      },
    },
  });
  
  // Selectors
  export const selectIsUserLoggedIn = (state) => !!state.auth.token;
  export const selectUserName = (state) => state.auth.user?.fullName; // Selector to get the user's name
  
  export const { setCredentials, logout } = authSlice.actions;
  
  export default authSlice.reducer;
  
