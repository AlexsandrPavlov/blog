import {configureStore} from '@reduxjs/toolkit';
import articlesReducer from './slice/articleSlice.js';
import paginationReducer from './slice/paginationSlice.js';
import postReducer from './slice/postSlice.js';
import registerReducer from './slice/registerSlice.js';
import authReducer from './slice/authSlice.js';
import newPostReducer from './slice/newPostSlice.js';
import deletePostReducer from './slice/deletePostSlice.js';
import editProfileReducer from './slice/editProfileSlice.js';
import editPostReducer from './slice/editPostSlice.js';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: postReducer,
    pagination: paginationReducer,
    register: registerReducer,
    auth: authReducer,
    newPost: newPostReducer,
    deletePost: deletePostReducer,
    editProfile: editProfileReducer,
    editPost: editPostReducer,
  },
});
