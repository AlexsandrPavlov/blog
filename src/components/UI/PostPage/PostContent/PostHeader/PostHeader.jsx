import {formatDate} from '../../../../Func/formatDate';
import style from './PostHeaderStyle.module.css';
import {Avatar, Tag} from 'antd';
import {HeartOutlined} from '@ant-design/icons';
import avatar from '../../../../UI/PostsList/Post/avatar.png';
import {likePost, unlikePost} from '../../../../../store/slice/likePostSlice.js';
import {useDispatch, useSelector} from 'react-redux';

export const PostHeader = (post) => {
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {title, description, author, createdAt, tagList, favoritesCount, favorited, slug} = post;
  const handleLikeClick = () => {
    if (!token) {
      alert('You must be logged in to like posts.');
      return;
    }
    if (favorited) {
      dispatch(unlikePost({slug}));
    } else {
      dispatch(likePost({slug}));
    }
  };
  return (
    <div className={style.container_header}>
      <div className={style.post_header}>
        <section className={style.post_header_about}>
          <h1 className={style.post_title}>{title}</h1>
          {token ? (
            favorited ? (
              <HeartFilled style={{color: 'red'}} className={style.icon_like} onClick={handleLikeClick} />
            ) : (
              <HeartOutlined className={style.icon_like} onClick={handleLikeClick} />
            )
          ) : (
            <HeartOutlined className={`${style.icon_like} ${style.icon_like_disabled}`} />
          )}
          <span className={style.post_likes}>{favoritesCount}</span>
          <br />
          {tagList.length ? (
            tagList.map((tag, index) => (
              <Tag key={index} className={style.tag_name}>
                {tag}
              </Tag>
            ))
          ) : (
            <Tag className={style.tag_name} color="red">
              No tags
            </Tag>
          )}
        </section>
        <section className={style.post_header_user}>
          <section className={style.post_header_user_info}>
            <span className={style.user_name}>{author.username}</span>
            <span className={style.user_date}>{formatDate(createdAt)}</span>
          </section>
          {author.image ? <Avatar size={46} src={author.image} /> : <Avatar size={46} src={avatar} />}
        </section>
      </div>
      <div className={style.post_content}>
        <p>{description}</p>
      </div>
    </div>
  );
};
