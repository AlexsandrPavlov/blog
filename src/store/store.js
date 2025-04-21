import {configureStore} from '@reduxjs/toolkit';
import articlesReducer from './slice/articleSlice.js';
import paginationReducer from './slice/paginationSlice.js';
import postReducer from './slice/postSlice.js';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: postReducer,
    pagination: paginationReducer,
  },
});
