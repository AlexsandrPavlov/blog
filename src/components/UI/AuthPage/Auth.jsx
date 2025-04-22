import styles from './AuthStyle.module.css';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginUser, fetchCurrentUser} from '../../../store/slice/authSlice.js';

export const Auth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const fields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email address',
      label: 'Email address',
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Invalid email address.' : '';
      },
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      label: 'Password',
      validation: (value) =>
        value.length < 6 || value.length > 40 ? 'Password must be between 6 and 40 characters.' : '',
    },
  ];

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = fields.reduce((acc, field) => {
      acc[field.name] = field.validation(formData[field.name]);
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsLoading(true);
    try {
      // Используем unwrap для обработки ошибок потому что в случае ошибки мы получим rejectWithValue из за промиса
      await dispatch(loginUser({email: formData.email, password: formData.password})).unwrap();
      await dispatch(fetchCurrentUser()).unwrap();
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/posts');
      }, 2000);
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({
        ...errors,
        email: 'Invalid email or password.',
      });
      setFormData({
        email: formData.email,
        password: '',
      });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className={styles.label}>
            {field.label}
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`${styles.input} ${errors[field.name] ? styles.inputError : ''}`}
            />
            {errors[field.name] && <p className={styles.errorText}>{errors[field.name]}</p>}
          </label>
        ))}
        <button
          type="submit"
          className={`${styles.button} ${isSuccess ? styles.successButton : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Logining...' : isSuccess ? 'Success! Redirect to main page ' : 'Login'}
        </button>
      </form>
      <p className={styles.footerText}>
        {'Don’t have an account? '}
        <Link to="/register" className={styles.link}>
          Sign Up.
        </Link>
      </p>
    </div>
  );
};
