import styles from './LoggedBlockStyle.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from '../../../../../store/slice/authSlice';
import {useSelector} from 'react-redux';
import {Avatar} from 'antd';
import avatar from '../../../PostsList/Post/avatar.png';

export const LoggedBlock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  const handaleLogOut = () => {
    dispatch(logout());
    navigate('/');
  };
  const handaleProfile = () => {
    navigate('/login/edit');
  };
  return (
    <div className={styles.navbar__logged}>
      <Link className={styles.link} to="/">
        Create article
      </Link>
      <div onClick={handaleProfile} className={styles.navbar__logged__user}>
        <p className={styles.username}>{user.username}</p>
        {user.image ? <Avatar size={46} src={user.image} /> : <Avatar size={46} src={avatar} />}
      </div>
      <button onClick={handaleLogOut} className={styles.navbar__logout}>
        Log Out
      </button>
    </div>
  );
};
