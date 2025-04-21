import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {createArticle} from '../../components/api/api.js';

export const createPost = createAsyncThunk('post/create', async ({token, articleData}, thunkAPI) => {
  try {
    const response = await createArticle(token, articleData);
    return response.data.article;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

const newPostSlice = createSlice({
  name: 'newPost',
  initialState: {
    post: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newPostSlice.reducer;
