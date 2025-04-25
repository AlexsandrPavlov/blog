import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://blog-platform.kata.academy/api'}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({email, password}) => ({
        url: '/users/login',
        method: 'POST',
        body: {user: {email, password}},
      }),
    }),
    register: builder.mutation({
      query: ({username, email, password}) => ({
        url: '/users',
        method: 'POST',
        body: {user: {username, email, password}},
      }),
    }),
    getCurrentUser: builder.query({
      query: (token) => ({
        url: '/user',
        headers: {Authorization: `Token ${token}`},
      }),
    }),
    updateUser: builder.mutation({
      query: ({token, userData}) => ({
        url: '/user',
        method: 'PUT',
        body: {user: userData},
        headers: {Authorization: `Token ${token}`},
      }),
    }),
    getArticles: builder.query({
      query: ({params, token = null}) => ({
        url: `articles?${params}`,
        headers: token ? {Authorization: `Token ${token}`} : {},
      }),
    }),
    getArticle: builder.query({
      query: ({slug, token = null}) => ({
        url: `articles/${slug}`,
        headers: token ? {Authorization: `Token ${token}`} : {},
      }),
    }),
    createArticle: builder.mutation({
      query: ({token, articleData}) => ({
        url: '/articles',
        method: 'POST',
        body: {article: articleData},
        headers: {Authorization: `Token ${token}`},
      }),
    }),
    updateArticle: builder.mutation({
      query: ({token, slug, articleData}) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: {article: articleData},
        headers: {Authorization: `Token ${token}`},
      }),
    }),
    deleteArticle: builder.mutation({
      query: ({token, slug}) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {Authorization: `Token ${token}`},
      }),
    }),
    likeArticle: builder.mutation({
      query: ({token, slug}) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
        headers: {Authorization: `Token ${token}`},
      }),
    }),
    unlikeArticle: builder.mutation({
      query: ({token, slug}) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {Authorization: `Token ${token}`},
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} = api;
