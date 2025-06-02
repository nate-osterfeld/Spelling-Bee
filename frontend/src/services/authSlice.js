import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
	endpoints: (builder) => ({
		getCurrentUser: builder.query({
			query: () => ({
				url: '/api/user/current-user',
				method: 'GET',
				credentials: 'include',
			}),
			providesTags: ['User'] // Auto refetch if invalidated
		}),
		getUserProgress: builder.query({
			query: () => ({
				url: '/api/stats/progress',
				method: 'GET',
				credentials: 'include',
			}),
			providesTags: ['User'] // Auto refetch if invalidated
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
		updateUsername: builder.mutation({
			query: ({ username }) => ({
				url: 'api/user/update-username',
				method: 'PATCH',
				credentials: 'include',
				body: { username }
			}),
			invalidatesTags: ['User'] // Invalidate 'User' tags
    	}),
		updatePassword: builder.mutation({
			query: ({ currentPassword, newPassword }) => ({
				url: 'api/user/update-password',
				method: 'PATCH',
				credentials: 'include',
				body: { currentPassword, newPassword }
			}),
			invalidatesTags: ['User'] // Invalidate 'User' tags
    	})
	}),
})

export const { 
	useGetCurrentUserQuery,
	useGetUserProgressQuery,
	useGetUserProgressByIdQuery,
	useGetLeaderboardQuery,
	useUpdateUsernameMutation,
	useUpdatePasswordMutation
 } = authApi
