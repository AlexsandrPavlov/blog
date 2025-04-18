import {configureStore} from '@reduxjs/toolkit';
import articlesReducer from './slice/articleSlice.js';
import paginationReducer from './slice/paginationSlice.js';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    pagination: paginationReducer,
  },
});
