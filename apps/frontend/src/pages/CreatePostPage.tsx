import React from 'react';

import { PostForm } from '../components/postForm/PostForm';

import styles from '../styles/common.module.css';

const CreatePostPage: React.FC = () => {
  return (
    <>
      <h1 className={styles.title}>Create New Post</h1>
      <PostForm />
    </>
  );
};

export default CreatePostPage;
