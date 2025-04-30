import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch } from '../../hooks/hooks';
import { addComment } from '../../app/comments/commentsThunks';
import { commentSchema, CommentSchema } from '../../schemas/schemas';

import styles from './CommentForm.module.css';
import { notifyError, notifySuccess } from '../../utils/toast-util';

type Props = {
  postId: number;
};

export const CommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' }
  });

 const onSubmit = async (data: CommentSchema) => {
  try {
    await dispatch(addComment({ postId, commentData: data }));
    notifySuccess('Comment added successfully!'); 
    reset();
  } catch (error) {
    notifyError('Failed to add comment. Please try again.'); 
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor="content" className={styles.label}>
        Add a Comment
      </label>
      <textarea
        id="content"
        {...register('content')}
        className={styles.textarea}
      />
      {errors.content && (
        <p className={styles.error}>{errors.content.message}</p>
      )}

      <button type="submit" className={styles.button}>
        Post Comment
      </button>
    </form>
  );
};
