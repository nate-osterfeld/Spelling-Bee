import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
	tagTypes: ['User', 'Progress', 'Saved'],
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
			providesTags: ['User', 'Progress'] // Auto refetch if invalidated
		}),
		getUserProgressById: builder.query({
			query: ({ userId }) => ({
				url: `/api/stats/u/${userId}`,
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
			invalidatesTags: ['User'] // Invalidates 'User' tags
    	}),
		updatePassword: builder.mutation({
			query: ({ currentPassword, newPassword }) => ({
				url: 'api/user/update-password',
				method: 'PATCH',
				credentials: 'include',
				body: { currentPassword, newPassword }
			}),
			invalidatesTags: ['User'] // Invalidates 'User' tags
    	}),
		getFavoriteWords: builder.query({
			query: () => ({
				url: 'api/user/saved-words',
				method: 'GET',
				credentials: 'include',
			}),
			providesTags: ['Saved'] // // Auto refetch if invalidated
		}),
		addWordToFavorites: builder.mutation({
			query: ({ word_id }) => ({
				url: 'api/words/saved-words',
				method: 'POST',
				credentials: 'include',
				body: { word_id }
			}),
			invalidatesTags: ['Saved', 'Progress'] // Invalidate 'Saved' + 'Progress' tags
		}),
		removeFromFavorites: builder.mutation({
			query: ({ word_id }) => ({
				url: `api/words/saved-words/${word_id}`,
				method: 'DELETE',
				credentials: 'include',
			}),
			invalidatesTags: ['Saved', 'Progress'] // Invalidates 'Saved' + 'Progress' tags
		})
	}),
})

export const { 
	useGetCurrentUserQuery,
	useGetUserProgressQuery,
	useGetUserProgressByIdQuery,
	useGetLeaderboardQuery,
	useUpdateUsernameMutation,
	useUpdatePasswordMutation,
	useGetFavoriteWordsQuery,
	useAddWordToFavoritesMutation,
	useRemoveFromFavoritesMutation
 } = authApi
