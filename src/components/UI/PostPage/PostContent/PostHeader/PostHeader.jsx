import {formatDate} from '../../../../Func/formatDate';
import style from './PostHeaderStyle.module.css';
import {Avatar, Tag} from 'antd';
import {HeartOutlined} from '@ant-design/icons';
import avatar from '../../../../UI/PostsList/Post/avatar.png';

export const PostHeader = (post) => {
  const {title, description, author, createdAt, tagList, favoritesCount} = post;
  return (
    <div className={style.container_header}>
      <div className={style.post_header}>
        <section className={style.post_header_about}>
          <h1 className={style.post_title}>{title}</h1>
          {/* <HeartFilled style={{color: 'red'}} className={style.icon_like} /> */}
          <HeartOutlined className={style.icon_like} />
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
