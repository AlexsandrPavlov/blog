import {Post} from './Post/Post.jsx';
import style from './PostList.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {setPage} from '../../../store/slice/paginationSlice.js';
import {ErrorAlert} from '../assets/ErrorAlert/ErrorAlert.jsx';
import {Spinner} from '../assets/LoadSpinner/Spinner.jsx';
import {useGetArticlesQuery} from '../../../api/userApi.js';
import {MemoizedPaginationPosts} from '../assets/Pagination/Pagination';

export const PostList = () => {
  const dispatch = useDispatch();
  const {data: count, articles, isLoading, isError} = useGetArticlesQuery({limit, offset});
  const {currentPage, limit, offset} = useSelector((state) => state.pagination);

  const handlePageChange = (offset, page) => {
    dispatch(setPage({page}));
  };

  return (
    (isLoading && (
      <div className={style.spinner_wrapper}>
        <Spinner />
      </div>
    )) ||
    (isError && <ErrorAlert error={isError} />) || (
      <div className={style.posts_wrapper}>
        {articles.map((article) => (
          <Post key={article.slug} {...article} />
        ))}
        <MemoizedPaginationPosts countPosts={count} handlePageChange={handlePageChange} currentPage={currentPage} />
      </div>
    )
  );
};
