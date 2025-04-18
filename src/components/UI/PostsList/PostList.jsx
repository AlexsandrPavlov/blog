import {PaginationPosts} from '../assets/Pagination/Pagination';
import {Post} from './Post/Post.jsx';
import style from './PostList.module.css';
import {useEffect, useState} from 'react';
import {getArticles} from '../../api/api.js';
import {ErrorAlert} from '../assets/ErrorAlert/ErrorAlert.jsx';
import {Spinner} from '../assets/LoadSpinner/Spinner.jsx';

export const PostList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countPosts, setCountPosts] = useState(0);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getArticles({limit: 5, offset: offset});
        const articles = data.data.articles.map((article) => ({
          ...article,
          id: new Date().getTime() + Math.random(),
        }));
        setCountPosts(data.data.articlesCount);
        setArticles(articles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Failed to loading posts', error.message);
      }
    };

    fetchArticles();
  }, [offset]);

  const handlePageChange = (offset, page) => {
    setCurrentPage(page);
    setOffset(offset);
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
          <Post key={article.id} {...article} />
        ))}
        <PaginationPosts countPosts={countPosts} handlePageChange={handlePageChange} currentPage={currentPage} />
      </div>
    )
  );
};
