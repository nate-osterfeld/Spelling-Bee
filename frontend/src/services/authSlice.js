import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8800' }),
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => ({
                url: '/api/current-user',
                method: 'GET',
                credentials: 'include'
            })
        })
    })
})

export const { useGetCurrentUserQuery } = authApi
