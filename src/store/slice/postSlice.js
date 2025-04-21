import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getArticle} from '../../components/api/api.js';

export const fetchPost = createAsyncThunk('article/fetchArticle', async (slug) => {
  const response = await getArticle(slug);
  return response.data;
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
      });
  },
});

export default postSlice.reducer;
