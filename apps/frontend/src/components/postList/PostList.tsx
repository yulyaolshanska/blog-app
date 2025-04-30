import React from 'react';
import { Link } from 'react-router-dom';

import { Post } from '../../shared/types/post.types';
import styles from './PostList.module.css';

interface Props {
  posts: Post[];
}

export const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <ul className={styles.list}>
      {posts.map(({ id, title, content }) => (
        <li key={id} className={styles.item}>
          <Link to={`/post/${id}`} className={styles.link}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.content}>{content}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
