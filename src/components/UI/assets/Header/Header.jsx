import {Auth} from './AuthBlock/Auth';
import style from './Header.module.css';
import {Link} from 'react-router';

export const Header = () => {
  let displayedName = 'RealWorld Blog';
  return (
    <>
      <div className={style.header}>
        <nav className={style.header__navbar}>
          <Link className={style.link__logo} to="/posts">
            {displayedName}
          </Link>
          <Auth />
        </nav>
      </div>
    </>
  );
};
