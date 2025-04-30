import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { fetchPosts, removePost } from '../../app/posts/postsThunks';
import { RootState } from '../../app/store';
import { Post } from '../../shared/types/post.types';
import { ConfirmationModal } from '../confirmationModal/ConfirmationModal';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { notifyError, notifySuccess } from '../../utils/toast-util';
import { Loader } from '../loader/Loader';

import styles from './PostDetails.module.css';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const post = useAppSelector((state: RootState) =>
    state.posts.posts.find((post: Post) => post.id === postId)
  );

  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts());
    }
  }, [dispatch, post, postId]);

  const handleDelete = async () => {
    try {
      await dispatch(removePost(postId)).unwrap();
      notifySuccess('Blog deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
      notifyError('Failed to delete blog. Please try again.');
    }
  };

  return post ? (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.content}>{post.content}</p>
        <div className={styles.actions}>
          <Link
            to={`/edit/${post.id}`}
            className={`${styles.button} ${styles.editButton}`}
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className={`${styles.button} ${styles.deleteButton}`}
          >
            Delete
          </button>
        </div>
      </div>
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this post?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  ) : (
    <Loader />
  );
};
