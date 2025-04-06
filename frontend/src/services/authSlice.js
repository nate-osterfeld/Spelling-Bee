import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.BACKEND_URL }),
	endpoints: (builder) => ({
		getCurrentUser: builder.query({
			query: () => ({
				url: '/api/current-user',
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getUserProgress: builder.query({
			query: () => ({
				url: '/api/words/progress',
				method: 'GET',
				credentials: 'include',
			}),
		}),
	}),
})

export const { useGetCurrentUserQuery, useGetUserProgressQuery } = authApi
