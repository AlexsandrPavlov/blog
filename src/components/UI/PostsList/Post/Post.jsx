import style from './Post.module.css';
import {Avatar, Tag} from 'antd';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import avatar from './avatar.png';
import {useNavigate} from 'react-router';
import {formatDate} from '../../../Func/formatDate';
import {useDispatch, useSelector} from 'react-redux';
import {likePost, unlikePost} from '../../../../store/slice/likePostSlice.js';

export const Post = (props) => {
  const {title, description, author, createdAt, tagList, favoritesCount, slug, favorited} = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);

  const handlePostClick = () => {
    navigate('/post/' + slug);
  };

  const handleLikeClick = () => {
    if (favorited) {
      dispatch(unlikePost({slug}));
    } else {
      dispatch(likePost({slug}));
    }
  };

  return (
    <div className={style.container_post}>
      <section className={style.post_header}>
        <section className={style.post_header_about}>
          <a onClick={handlePostClick} className={style.post_title}>
            {title}
          </a>
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
      </section>
      <div className={style.post_content}>
        <p onClick={handlePostClick}>{description}</p>
      </div>
    </div>
  );
};
