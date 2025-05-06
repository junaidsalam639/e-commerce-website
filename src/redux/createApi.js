import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ecommerceApi = createApi({
    reducerPath: 'ecommerceApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://e-commerce-website-sooty.vercel.app/api' }),
    endpoints: () => ({}),
})


