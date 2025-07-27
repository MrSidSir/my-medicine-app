import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '@/app/utils/baseURL';

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/medicines`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

const medicinesApi = createApi({
  reducerPath: 'medicinesApi',
  baseQuery,
  tagTypes: ['Medicines'],
  endpoints: (builder) => ({
    fetchAllMedicines: builder.query({
      query: () => "/",
      providesTags: ["Medicines"],
    }),
    getFeaturedMedicines: builder.query({
      query: () => "/featured",
      providesTags: ["Medicines"],
    }),
    fetchMedicineById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Medicines", id }],
    }),
    addMedicine: builder.mutation({
      query: (newMedicine) => ({
        url: `/create-medicine`,
        method: "POST",
        body: newMedicine,
      }),
      invalidatesTags: ["Medicines"],
    }),
    updateMedicine: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Medicines"],
    }),
    deleteMedicine: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medicines"],
    }),
  }),
});

export const {
  useFetchAllMedicinesQuery,
  useGetFeaturedMedicinesQuery,
  useFetchMedicineByIdQuery,
  useAddMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = medicinesApi;

export default medicinesApi;
