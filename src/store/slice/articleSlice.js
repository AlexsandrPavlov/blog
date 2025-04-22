import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getArticles, likeArticle, unlikeArticle} from '../../components/api/api.js';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (params) => {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await getArticles(params, token);
    return response.data;
  }
  const response = await getArticles(params);
  return response.data;
});

export const likePost = createAsyncThunk('articles/likePost', async ({slug}, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  if (!token) {
    return thunkAPI.rejectWithValue('User is not authorized');
  }
  try {
    const response = await likeArticle(token, slug);

    return response.data.article;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

export const unlikePost = createAsyncThunk('articles/unlikePost', async ({slug}, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  if (!token) {
    return thunkAPI.rejectWithValue('User is not authorized');
  }
  try {
    const response = await unlikeArticle(token, slug);
    return response.data.article;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.articles;
        state.count = action.payload.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(likePost.fulfilled, (state, action) => {
        state.items = state.items.map((article) => (article.slug === action.payload.slug ? action.payload : article));
      })

      .addCase(unlikePost.fulfilled, (state, action) => {
        state.items = state.items.map((article) => (article.slug === action.payload.slug ? action.payload : article));
      });
  },
});

export default articlesSlice.reducer;
