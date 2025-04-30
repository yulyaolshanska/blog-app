import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch } from '../../hooks/hooks';
import { addComment, fetchComments } from '../../app/comments/commentsThunks';
import { COMMENTS_LIMIT } from '../../shared/constants/constants';
import { commentSchema, CommentSchema } from '../../schemas/schemas';
import { notifyError, notifySuccess } from '../../utils/toast-util';

import styles from './CommentForm.module.css';

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
      await dispatch(fetchComments({ postId, limit: COMMENTS_LIMIT, page: 1 }));
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
