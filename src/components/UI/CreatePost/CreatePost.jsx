import styles from './CreatePostStyle.module.css';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createPost} from '../../../store/slice/newPostSlice.js';

export const CreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    tagList: [],
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    body: '',
    tag: '',
  });

  const [tagInput, setTagInput] = useState('');

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

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tagList.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tagList: [...formData.tagList, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tagList: formData.tagList.filter((t) => t !== tag),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: !formData.title.trim() ? 'Title is required.' : '',
      description: !formData.description.trim() ? 'Description is required.' : '',
      body: !formData.body.trim() ? 'Text is required.' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(createPost({token, articleData: formData})).unwrap();
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/posts');
      }, 1000);
    } catch (error) {
      console.error('Failed to create post:', error);
      setErrors({
        ...errors,
        title: 'Failed to create post.',
      });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create new article</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          />
          {errors.title && <p className={styles.errorText}>{errors.title}</p>}
        </label>
        <label className={styles.label}>
          Short description
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description"
            className={`${styles.input} ${errors.description ? styles.inputError : ''}`}
          />
          {errors.description && <p className={styles.errorText}>{errors.description}</p>}
        </label>
        <label className={styles.label}>
          Text
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Text"
            className={`${styles.textarea} ${errors.body ? styles.inputError : ''}`}
          />
          {errors.body && <p className={styles.errorText}>{errors.body}</p>}
        </label>
        <div className={styles.tagsContainer}>
          <div className={styles.tagsList}>
            {formData.tagList.map((tag, index) => (
              <div key={index} className={styles.tag}>
                <span>{tag}</span>
                <button type="button" onClick={() => handleRemoveTag(tag)} className={styles.deleteTagButton}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className={styles.addTagContainer}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Tag"
              className={styles.input}
            />
            <button type="button" onClick={handleAddTag} className={styles.addTagButton}>
              Add tag
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`${styles.button} ${isSuccess ? styles.successButton : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : isSuccess ? 'Success! Redirecting to post' : 'Send'}
        </button>
      </form>
    </div>
  );
};
