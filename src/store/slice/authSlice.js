import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {login, getCurrentUser} from '../../components/api/api.js';

export const loginUser = createAsyncThunk('auth/login', async ({email, password}, thunkAPI) => {
  try {
    const response = await login(email, password);
    const user = response.data.user;
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loginTime', Date.now());
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  if (!token) {
    return thunkAPI.rejectWithValue('No token found');
  }
  try {
    const response = await getCurrentUser(token);
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors || 'Failed to fetch user');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('image');
    },
    checkSession(state) {
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime && Date.now() - loginTime > 3600000) {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('image');
      }
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
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout, checkSession} = authSlice.actions;
export default authSlice.reducer;
