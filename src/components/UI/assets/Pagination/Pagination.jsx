import {Pagination} from 'antd';
import style from './Pagination.module.css';

export const PaginationPosts = ({countPosts, handlePageChange, currentPage}) => {
  return (
    <>
      <Pagination
        align="center"
        defaultCurrent={currentPage}
        onChange={(page) => {
          const offset = page * 5 - 5;
          handlePageChange(offset, page);
        }}
        total={countPosts}
        className={style.pagination}
        showSizeChanger={false}
      />
    </>
  );
};
