import styles from './Auth.module.css';

export const Auth = () => {
  let linkActive = styles.link__active + ' ' + styles.link;
  return (
    <div className={styles.navbar__auth}>
      <a className={styles.link} href="">
        Sign In
      </a>
      <a className={linkActive} href="">
        Sign Up
      </a>
    </div>
  );
};
