import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {register} from '../../components/api/api.js';

export const registerUser = createAsyncThunk('auth/register', async ({username, email, password}, thunkAPI) => {
  try {
    const response = await register(username, email, password);
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
