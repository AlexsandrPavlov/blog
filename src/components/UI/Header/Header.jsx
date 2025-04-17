import {Auth} from '../Auth/Auth';
import style from './Header.module.css';

export const Header = () => {
  let displayedName = 'RealWorld Blog';
  return (
    <>
      <div className={style.header}>
        <nav className={style.header__navbar}>
          <a className={style.link__logo} href="">
            {displayedName}
          </a>
          <Auth />
        </nav>
      </div>
    </>
  );
};
