import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import { authApi } from "./services/auth"; // We'll create this service next
import { apiSlice } from "./services/api"; // We'll create this service next

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(apiSlice.middleware),
});
