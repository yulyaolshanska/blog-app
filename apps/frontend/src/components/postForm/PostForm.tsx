import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/hooks';
import { addPost, editPost } from '../../app/posts/postsThunks';
import { postSchema, PostSchema } from '../../schemas/schemas';
import { notifyError, notifySuccess } from '../../utils/utils';
import { AppRoute } from '../../shared/constants/appRoutes';
import { ErrorMessages } from '../../shared/enums/ErrorMessages';

import styles from './PostForm.module.css';

type Props = {
  postId?: number;
  initialTitle?: string;
  initialContent?: string;
};

export const PostForm: React.FC<Props> = ({
  postId,
  initialTitle = '',
  initialContent = ''
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialTitle,
      content: initialContent
    }
  });

  const onSubmit = async (data: PostSchema) => {
    setLoading(true);
    try {
      if (postId) {
        await dispatch(editPost({ id: postId, postData: data }));
        notifySuccess('Blog update successfully!');
      } else {
        await dispatch(addPost(data));
        notifySuccess('Blog create successfully!');
      }
      navigate(AppRoute.HOME);
    } catch (error) {
      console.error(ErrorMessages.ADD_POST_FAILED, error);
      notifyError(
        postId ? ErrorMessages.EDIT_POST_FAILED : ErrorMessages.ADD_POST_FAILED
      );
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor="title" className={styles.label}>
        Title
      </label>
      <input
        id="title"
        {...register('title')}
        placeholder="Enter post title"
        className={styles.input}
        disabled={loading}
      />
      {errors.title && <p className={styles.error}>{errors.title.message}</p>}

      <label htmlFor="content" className={styles.label}>
        Content
      </label>
      <textarea
        id="content"
        {...register('content')}
        placeholder="Enter post content"
        className={styles.textarea}
        disabled={loading}
      />
      {errors.content && (
        <p className={styles.error}>{errors.content.message}</p>
      )}

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Submitting...' : postId ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};
