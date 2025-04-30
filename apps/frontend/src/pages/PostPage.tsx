import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { fetchComments } from '../app/comments/commentsThunks';
import { RootState } from '../app/store';
import { PostDetails } from '../components/postDetails/PostDetails';
import { CommentForm } from '../components/commentForm/CommentForm';
import { CommentList } from '../components/commentList/CommentList';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { Loader } from '../components/loader/Loader';
import { COMMENTS_LIMIT } from '../shared/constants/constants';
import { notifyError } from '../utils/toast-util';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const postId = Number(id);
  const dispatch = useAppDispatch();
  const {
    commentsByPostId,
    totalPagesByPostId,
    loading: commentsLoading
  } = useAppSelector((state: RootState) => state.comments);
  const comments = commentsByPostId[postId] ?? [];
  const totalPages = totalPagesByPostId[postId] ?? 0;

  useEffect(() => {
    const fetchInitialComments = async () => {
      try {
        await dispatch(
          fetchComments({ postId, limit: COMMENTS_LIMIT, page: 1 })
        );
      } catch (error) {
        notifyError('Failed to load comments. Please try again later.');
      }
    };

    fetchInitialComments();
  }, [dispatch, id, postId]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const page = selected + 1;
    dispatch(fetchComments({ postId, page, limit: COMMENTS_LIMIT }));
  };

  return (
    <>
      <PostDetails postId={postId} />
      <CommentForm postId={postId} />
      {commentsLoading ? (
        <Loader />
      ) : (
        <>
          <CommentList comments={comments} />
          {totalPages > 1 && (
            <ReactPaginate
              previousLabel={'← Prev'}
              nextLabel={'Next →'}
              breakLabel={'...'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          )}
        </>
      )}
    </>
  );
};

export default PostPage;
