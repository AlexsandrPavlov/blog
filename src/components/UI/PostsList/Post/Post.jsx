import style from './Post.module.css';
import {Avatar, Tag} from 'antd';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import avatar from './avatar.png';

export const Post = (props) => {
  const {title, description, author, createdAt, tagList, favoritesCount} = props;
  const date = new Date(createdAt);
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className={style.container_post}>
      <section className={style.post_header}>
        <section className={style.post_header_about}>
          <a className={style.post_title}>{title}</a>
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
            <span className={style.user_date}>{formattedDate}</span>
          </section>
          {author.image ? <Avatar size={46} src={author.image} /> : <Avatar size={46} src={avatar} />}
        </section>
      </section>
      <div className={style.post_content}>
        <p>{description}</p>
      </div>
    </div>
  );
};
