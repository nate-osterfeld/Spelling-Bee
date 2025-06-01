import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
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
				url: '/api/stats/progress',
				method: 'GET',
				credentials: 'include',
			}),
		}),
		// Eventually change to have a public account page to display (display progress page for now)
		getUserProgressById: builder.query({
			query: ({ userId }) => ({
				url: `/api/stats/u/${userId}`, // Will have username instead of userId
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getLeaderboard: builder.query({
			query: ({ page = 1, pageSize = 25 }) => ({
				url: `/api/stats/leaderboard/${page}/?pageSize=${pageSize}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
	}),
})

export const { useGetCurrentUserQuery, useGetUserProgressQuery, useGetUserProgressByIdQuery, useGetLeaderboardQuery } = authApi
