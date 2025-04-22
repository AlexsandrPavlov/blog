import axios from 'axios';

const API_URL = 'https://blog-platform.kata.academy/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (email, password) => api.post('/users/login', {user: {email, password}});

export const register = (username, email, password) => api.post('/users', {user: {username, email, password}});

export const getCurrentUser = (token) =>
  api.get('/user', {
    headers: {Authorization: `Token ${token}`},
  });

export const updateUser = (token, userData) =>
  api.put(
    '/user',
    {user: userData},
    {
      headers: {Authorization: `Token ${token}`},
    }
  );

export const getArticles = (params, token = null) =>
  api.get('/articles', {
    params,
    headers: token
      ? {
          Authorization: `Token ${token}`,
        }
      : {},
  });

export const getArticle = (slug, token = null) =>
  api.get(`/articles/${slug}`, {
    headers: token
      ? {
          Authorization: `Token ${token}`,
        }
      : {},
  });

export const createArticle = (token, articleData) =>
  api.post(
    '/articles',
    {article: articleData},
    {
      headers: {Authorization: `Token ${token}`},
    }
  );

export const updateArticle = (token, slug, articleData) =>
  api.put(
    `/articles/${slug}`,
    {article: articleData},
    {
      headers: {Authorization: `Token ${token}`},
    }
  );

export const deleteArticle = (token, slug) =>
  api.delete(`/articles/${slug}`, {
    headers: {Authorization: `Token ${token}`},
  });
export const likeArticle = (token, slug) =>
  api.post(
    `/articles/${slug}/favorite`,
    {},
    {
      headers: {Authorization: `Token ${token}`},
    }
  );

export const unlikeArticle = (token, slug) =>
  api.delete(`/articles/${slug}/favorite`, {
    headers: {Authorization: `Token ${token}`},
  });

export default api;
