import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {updateUser} from '../../components/api/api.js';

// Асинхронный thunk для обновления данных пользователя
export const editUserProfile = createAsyncThunk('user/editProfile', async ({token, userData}, thunkAPI) => {
  try {
    const response = await updateUser(token, userData);
    const updatedUser = response.data.user;

    localStorage.setItem('user', JSON.stringify(updatedUser));

    return updatedUser;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors || 'Failed to update profile');
  }
});

const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Обновляем данные пользователя в состоянии
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Сохраняем ошибку
      });
  },
});

export default editProfileSlice.reducer;
