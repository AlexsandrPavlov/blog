import {createSlice} from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 1,
    limit: 5,
    offset: 0,
  },
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload.page;
      state.offset = (action.payload.page - 1) * state.limit;
    },
  },
});

export const {setPage} = paginationSlice.actions;
export default paginationSlice.reducer;
