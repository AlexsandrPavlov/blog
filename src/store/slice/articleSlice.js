import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getArticles} from '../../components/api/api.js';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (params) => {
  const response = await getArticles(params);
  return response.data;
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
      });
  },
});

export default articlesSlice.reducer;
