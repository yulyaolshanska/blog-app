import React from 'react';
import { format } from 'date-fns';

import { Comment } from '../../shared/types/comment.types';
import styles from './CommentList.module.css';

type Props = {
  comments: Comment[];
};

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <ul className={styles.list}>
      {comments.map(comment => (
        <li key={comment.id} className={styles.item}>
          <p>{comment.content}</p>
          <small className={styles.date}>
            {format(new Date(comment.createdAt), 'dd MMM yyyy HH:mm')}
          </small>{' '}
        </li>
      ))}
    </ul>
  );
};
