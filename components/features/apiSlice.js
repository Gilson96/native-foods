import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://react-food-api-03d094431a6b.herokuapp.com/foods",
  }),

  endpoints: (build) => ({

    getAllFoods: build.query({
      query: () => ({ url: '/' }),

    }),

  })
})


export const {
  useGetAllFoodsQuery
} = apiSlice;

