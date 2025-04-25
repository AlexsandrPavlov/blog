import {MemoizedPaginationPosts} from '../assets/Pagination/Pagination';
import {Post} from './Post/Post.jsx';
import style from './PostList.module.css';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchArticles} from '../../../store/slice/articleSlice.js';
import {setPage} from '../../../store/slice/paginationSlice.js';
import {ErrorAlert} from '../assets/ErrorAlert/ErrorAlert.jsx';
import {Spinner} from '../assets/LoadSpinner/Spinner.jsx';

export const PostList = () => {
  const dispatch = useDispatch();
  const {items: articles, count, loading, error} = useSelector((state) => state.articles);
  const {currentPage, limit, offset} = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(fetchArticles({limit, offset}));
  }, [dispatch, limit, offset]);

  const handlePageChange = (offset, page) => {
    dispatch(setPage({page}));
  };

  return (
    (loading && (
      <div className={style.spinner_wrapper}>
        <Spinner />
      </div>
    )) ||
    (error && <ErrorAlert error={error} />) || (
      <div className={style.posts_wrapper}>
        {articles.map((article) => (
          <Post key={article.slug} {...article} />
        ))}
        <MemoizedPaginationPosts countPosts={count} handlePageChange={handlePageChange} currentPage={currentPage} />
      </div>
    )
  );
};
