import React, { useEffect } from 'react';

import { fetchPosts } from '../app/posts/postsThunks';
import { RootState } from '../app/store';
import { PostList } from '../components/postList/PostList';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { Loader } from '../components/loader/Loader';

import styles from '../styles/common.module.css';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <h1 className={styles.title}>Blog Posts</h1>
      {loading ? <Loader /> : <PostList posts={posts} />}
    </>
  );
};

export default Home;
