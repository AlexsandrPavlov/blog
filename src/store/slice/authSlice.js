import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {login} from '../../components/api/api.js';

export const loginUser = createAsyncThunk('auth/login', async ({email, password}, thunkAPI) => {
  try {
    const response = await login(email, password);
    const user = response.data.user;
    localStorage.setItem('token', user.token); // Сохраняем токен в localStorage
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null, // Инициализация токена из localStorage
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Удаляем токен из localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
