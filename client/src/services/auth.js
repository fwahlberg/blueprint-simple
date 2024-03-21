import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HiLogin } from "react-icons/hi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
        query: (user) => ({
          url: "auth/login",
          method: "POST",
          body: user,
        }),
      }),
    // You can add more endpoints here, e.g., for login
  }),
});

// Export hooks for usage in functional components
export const { useRegisterMutation, useLoginMutation } = authApi;
