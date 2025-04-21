import style from './PostPageStyle.module.css';
import ReactMarkdown from 'react-markdown';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Spinner} from '../assets/LoadSpinner/Spinner.jsx';
import {ErrorAlert} from '../assets/ErrorAlert/ErrorAlert.jsx';
import {fetchPost} from '../../../store/slice/postSlice.js';
import {PostHeader} from './PostContent/PostHeader/PostHeader.jsx';

export const PostPage = () => {
  const {slug} = useParams();
  const dispatch = useDispatch();
  const {post, loading, error} = useSelector((state) => state.article);

  useEffect(() => {
    if (!post || post.slug !== slug) {
      dispatch(fetchPost(slug));
    }
  }, [dispatch, slug, post]);

  return (
    <div className={style.postPage}>
      {(loading && (
        <div className={style.spinner_wrapper}>
          <Spinner />
        </div>
      )) ||
        (error && (
          <div className={style.error_wrapper}>
            <ErrorAlert error={error} />
          </div>
        )) ||
        (post && (
          <>
            <PostHeader {...post} />
            <div className={style.post_mardown}>
              <ReactMarkdown>{post.body}</ReactMarkdown>
            </div>
          </>
        ))}
    </div>
  );
};
