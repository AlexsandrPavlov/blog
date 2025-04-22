import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getArticle, likeArticle, unlikeArticle} from '../../components/api/api.js';

export const fetchPost = createAsyncThunk('article/fetchArticle', async (slug) => {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await getArticle(slug, token);
    return response.data;
  }
  const response = await getArticle(slug);
  return response.data;
});

export const likePost = createAsyncThunk('article/likePost', async ({slug}, thunkAPI) => {
  const token = localStorage.getItem('token');
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

export const unlikePost = createAsyncThunk('article/unlikePost', async ({slug}, thunkAPI) => {
  const token = localStorage.getItem('token');
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

const postSlice = createSlice({
  name: 'article',
  initialState: {
    post: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.article;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.post = action.payload;
      });
  },
});

export default postSlice.reducer;
