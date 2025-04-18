import {Alert} from 'antd';
import styles from './ErrorAlert.module.css';

export const ErrorAlert = ({error}) => {
  return <Alert className={styles.error} message={error} type="error" showIcon />;
};
