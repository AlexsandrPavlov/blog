import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {deleteArticle} from '../../components/api/api.js';

export const deletePost = createAsyncThunk('post/delete', async ({token, slug}, thunkAPI) => {
  try {
    await deleteArticle(token, slug);
    return slug;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

const deletePostSlice = createSlice({
  name: 'deletePost',
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deletePostSlice.reducer;
