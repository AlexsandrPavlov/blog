import style from './Post.module.css';
import {Avatar, Tag} from 'antd';
import {HeartOutlined, HeartFilled, UserOutlined} from '@ant-design/icons';

export const Post = () => {
  return (
    <div className={style.container_post}>
      <section className={style.post_header}>
        <section className={style.post_header_about}>
          <a className={style.post_title}>Some article title</a>
          <HeartFilled style={{color: 'red'}} />
          <span className={style.post_likes}>12</span>
          <br />
          <Tag>Tag 1</Tag>
        </section>
        <section className={style.post_header_user}>
          <section className={style.post_header_user_info}>
            <span className={style.user_name}>User Name</span>
            <span className={style.user_date}>Date</span>
          </section>

          <Avatar size={46} icon={<UserOutlined />} />
        </section>
      </section>
    </div>
  );
};
