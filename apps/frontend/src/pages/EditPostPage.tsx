import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PostForm } from '../components/postForm/PostForm';
import { RootState } from '../app/store';

import styles from '../styles/common.module.css';

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const post = useSelector((state: RootState) =>
    state.posts.posts.find(post => post.id === postId)
  );

  if (!post) return <p className={styles.nothingFound}>Post not found</p>;

  return (
    <>
      <h1 className={styles.title}>Edit Post</h1>
      <PostForm
        postId={post.id}
        initialTitle={post.title}
        initialContent={post.content}
      />
    </>
  );
};

export default EditPostPage;
