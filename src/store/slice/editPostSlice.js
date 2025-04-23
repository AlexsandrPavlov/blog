import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getArticle, updateArticle} from '../../components/api/api';

// Получить пост по slug
export const fetchPost = createAsyncThunk('editPost/fetchPost', async (slug, {rejectWithValue}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await getArticle(slug, token);
    return response.data.article;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Обновить пост
export const updatePost = createAsyncThunk(
  'editPost/updatePost',
  async ({slug, token, articleData}, {rejectWithValue}) => {
    try {
      const response = await updateArticle(token, slug, articleData);
      return response.data.article;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const editPostSlice = createSlice({
  name: 'editPost',
  initialState: {
    post: null,
    isLoading: false,
    error: null,
    isSuccess: false,
  },
  reducers: {
    clearEditPostState: (state) => {
      state.post = null;
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPost
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // updatePost
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
        state.isSuccess = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isSuccess = false;
      });
  },
});

export const {clearEditPostState} = editPostSlice.actions;
export default editPostSlice.reducer;
