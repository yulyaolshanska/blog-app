import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchComments } from '../app/comments/commentsThunks';
import { RootState } from '../app/store';
import { PostDetails } from '../components/postDetails/PostDetails';
import { CommentForm } from '../components/commentForm/CommentForm';
import { CommentList } from '../components/commentList/CommentList';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { Loader } from '../components/loader/Loader';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const postId = Number(id)
  const dispatch = useAppDispatch();
  const { comments, loading: commentsLoading } = useAppSelector(
    (state: RootState) => state.comments
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, id]);

  return (
    <div>
      <PostDetails postId={postId} />
      {commentsLoading ? (
        <Loader />
      ) : (
        <>
          <CommentForm postId={postId} />
          <CommentList comments={comments} />
        </>
      )}
    </div>
  );
};

export default PostPage;
