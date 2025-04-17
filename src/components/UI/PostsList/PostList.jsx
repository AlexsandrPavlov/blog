import {PaginationPosts} from '../Pagination/Pagination';
import {Post} from '../Post/Post';
import style from './PostList.module.css';

export const PostList = () => {
  return (
    <div className={style.posts_wrapper}>
      <Post />
      <Post />
      <Post />
      <PaginationPosts />
    </div>
  );
};
