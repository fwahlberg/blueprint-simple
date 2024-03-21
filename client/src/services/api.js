import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Assuming this exists from the previous setup
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the state
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Other endpoints...

    // Endpoint to fetch guestlists
    fetchGuestlists: builder.query({
      query: () => "guestlists",
    }),
    fetchGuestlistById: builder.query({
      query: (guestListId) => `guestlists/${guestListId}`, // Ensure guestListId is used correctly
    }),

    createGuestlist: builder.mutation({
      query: (guestlist) => ({
        url: "guestlists",
        method: "POST",
        body: guestlist,
      }),
    }),
    updateGuestArrival: builder.mutation({
      query: ({ guestId, plusOnesArrived }) => ({
        url: `guestlists/guests/${guestId}/arrive`,
        method: "PUT",
        body: { plusOnesArrived },
      }),
      invalidatesTags: (result, error, { guestId }) => [
        result ? { type: 'Guestlist', id: result.guestList } : [], // Assuming the response includes guestListId
      ],
    }),
  }),
});

// Export hooks for usage in functional components, adding the new useFetchGuestlistsQuery
export const { useFetchGuestlistsQuery } = apiSlice;
export const { useCreateGuestlistMutation } = apiSlice;
export const { useFetchGuestlistByIdQuery } = apiSlice;
export const { useUpdateGuestArrivalMutation } = apiSlice;
