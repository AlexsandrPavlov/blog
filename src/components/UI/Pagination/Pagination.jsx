import {Pagination} from 'antd';
import style from './Pagination.module.css';

export const PaginationPosts = () => {
  return (
    <>
      <Pagination align="center" defaultCurrent={1} total={50} className={style.pagination} />
    </>
  );
};
