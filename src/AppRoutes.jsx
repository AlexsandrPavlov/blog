import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {PostList} from './components/UI/PostsList/PostList.jsx';
import {NotFound} from './components/UI/NotFound/NotFound.jsx';
import {Header} from './components/UI/assets/Header/Header.jsx';
import {PostPage} from './components/UI/PostPage/PostPage.jsx';
import {Register} from './components/UI/RegisterPage/Register.jsx';
import {Auth} from './components/UI/AuthPage/Auth.jsx';
import {EditProfile} from './components/UI/EditProfile/EditProfile.jsx';

export const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<PostList />} />
        <Route path="posts" element={<PostList />} />
        <Route path="post/:slug" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Auth />} />
        <Route path="login/edit" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};
