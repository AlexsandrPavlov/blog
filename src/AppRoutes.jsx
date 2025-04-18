import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {PostList} from './components/UI/PostsList/PostList.jsx';
import {NotFound} from './components/UI/NotFound/NotFound.jsx';
import {Header} from './components/UI/assets/Header/Header.jsx';

export const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<PostList />} />
        <Route path="posts" element={<PostList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
