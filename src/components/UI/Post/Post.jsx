import style from './Post.module.css';
import {Avatar, Tag} from 'antd';
import {HeartOutlined, HeartFilled, UserOutlined} from '@ant-design/icons';

export const Post = () => {
  return (
    <div className={style.container_post}>
      <section className={style.post_header}>
        <section className={style.post_header_about}>
          <a className={style.post_title}>Some article title</a>
          {/* <HeartFilled style={{color: 'red'}} className={style.icon_like} /> */}
          <HeartOutlined className={style.icon_like} />
          <span className={style.post_likes}>12</span>
          <br />
          <Tag className={style.tag_name}>Tag 1</Tag>
          <Tag className={style.tag_name}>Tag 1</Tag>
          <Tag className={style.tag_name}>Tag 1</Tag>
        </section>
        <section className={style.post_header_user}>
          <section className={style.post_header_user_info}>
            <span className={style.user_name}>John Doe</span>
            <span className={style.user_date}>March 5 , 2020</span>
          </section>
          <Avatar size={46} icon={<UserOutlined />} />
        </section>
      </section>
      <div className={style.post_content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem maximus iaculis. Donec sed odio
          dui. Nulla vitae elit libero, a pharetra augue. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam
          quis risus eget urna mollis ornare vel eu leo.
        </p>
      </div>
    </div>
  );
};
