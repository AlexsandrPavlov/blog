import style from './PostPageStyle.module.css';
import ReactMarkdown from 'react-markdown';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Spinner} from '../assets/LoadSpinner/Spinner.jsx';
import {ErrorAlert} from '../assets/ErrorAlert/ErrorAlert.jsx';
import {fetchPost} from '../../../store/slice/postSlice.js';
import {PostHeader} from './PostContent/PostHeader/PostHeader.jsx';
import {likePost, unlikePost} from '../../../store/slice/postSlice.js';

export const PostPage = () => {
  const {slug} = useParams();
  const dispatch = useDispatch();
  const {post, loading, error} = useSelector((state) => state.article);
  const {update} = useSelector((state) => state.editPost);

  useEffect(() => {
    if (!post || post.slug !== slug) {
      dispatch(fetchPost(slug));
    }
  }, [dispatch, slug, post]);

  const clickLikePost = (slug) => {
    if (post.favorited) {
      dispatch(unlikePost({slug}));
    } else {
      dispatch(likePost({slug}));
    }
  };
  useEffect(() => {
    if (update) {
      dispatch(fetchPost(slug));
    }
  }, [update, dispatch, slug]);

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
            <PostHeader {...post} clickLikePost={clickLikePost} />
            <div className={style.post_mardown}>
              <ReactMarkdown>{post.body}</ReactMarkdown>
            </div>
          </>
        ))}
    </div>
  );
};
