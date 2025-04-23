import {formatDate} from '../../../../Func/formatDate';
import style from './PostHeaderStyle.module.css';
import {Avatar, Tag} from 'antd';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import avatar from '../../../../UI/PostsList/Post/avatar.png';
import {Modal} from 'antd';
import {ExclamationCircleFilled} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {deletePost} from '../../../../../store/slice/deletePostSlice';
import {useNavigate} from 'react-router-dom';

import {useSelector} from 'react-redux';

const {confirm} = Modal;

export const PostHeader = (post) => {
  const {token, user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {title, description, author, createdAt, tagList, favoritesCount, slug, favorited, clickLikePost} = post;

  const handleLikeClick = () => {
    clickLikePost(slug);
  };

  const handleDel = () => {
    confirm({
      title: 'Are you sure you want to delete this post?',
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          await dispatch(deletePost({slug, token})).unwrap();
          navigate('/posts');
        } catch (error) {
          console.error('Failed to delete post:', error);
        }
      },
      onCancel() {},
    });
  };
  const handleEdit = () => {
    navigate('/../post/edit/' + slug);
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
        <p className={style.description_text}>{description}</p>
        {token && user.username === author.username && (
          <div className={style.post_header_user_actions}>
            <button onClick={handleDel} className={`${style.post_header_user_delete} ${style.post_header_user_button}`}>
              Delete
            </button>
            <button onClick={handleEdit} className={`${style.post_header_user_edit} ${style.post_header_user_button}`}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
