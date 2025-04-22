import {configureStore} from '@reduxjs/toolkit';
import articlesReducer from './slice/articleSlice.js';
import paginationReducer from './slice/paginationSlice.js';
import postReducer from './slice/postSlice.js';
import registerReducer from './slice/registerSlice.js';
import authReducer from './slice/authSlice.js';
import newPostReducer from './slice/newPostSlice.js';
import deletePostReducer from './slice/deletePostSlice.js';
import likePostReducer from './slice/likePostSlice.js';
import editProfileReducer from './slice/editProfileSlice.js';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: postReducer,
    pagination: paginationReducer,
    register: registerReducer,
    auth: authReducer,
    newPost: newPostReducer,
    deletePost: deletePostReducer,
    likePost: likePostReducer,
    editProfile: editProfileReducer,
  },
});
