import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {likeArticle, unlikeArticle} from '../../components/api/api.js';

export const likePost = createAsyncThunk('post/like', async ({slug}, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  if (!token) {
    return thunkAPI.rejectWithValue('User is not authorized');
  }
  try {
    const response = await likeArticle(token, slug);
    console.log(response.data.article);
    return response.data.article;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

export const unlikePost = createAsyncThunk('post/unlike', async ({slug}, thunkAPI) => {
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

const likePostSlice = createSlice({
  name: 'likePost',
  initialState: {
    post: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unlikePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likePostSlice.reducer;
