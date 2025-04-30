import React, { useEffect, useState } from 'react';
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
import { Post } from '../shared/types/post.types';
import { getPostById } from '../api/posts';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<Post | null>(null);
  const {
    commentsByPostId,
    totalPagesByPostId,
    loading: commentsLoading
  } = useAppSelector((state: RootState) => state.comments);
  const [currentPage, setCurrentPage] = useState(0);

  const postId = Number(id);
  const totalPages = totalPagesByPostId[postId] ?? 0;
  const comments = commentsByPostId[postId] ?? [];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(postId);
        setPost(fetchedPost);
      } catch (error) {
        notifyError('Failed to load post. Please try again later.');
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchInitialComments = async () => {
      try {
        await dispatch(
          fetchComments({
            postId,
            limit: COMMENTS_LIMIT,
            page: currentPage + 1
          })
        );
      } catch (error) {
        notifyError('Failed to load comments. Please try again later.');
      }
    };

    fetchInitialComments();
  }, [dispatch, postId, currentPage]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {post && (
        <>
          <PostDetails post={post} />
          <CommentForm postId={postId} />
          {commentsLoading && <Loader />}
          {comments.length !== 0 ? (
            <>
              <CommentList comments={comments} />
              {totalPages > 1 && (
                <ReactPaginate
                  previousLabel={'← Prev'}
                  nextLabel={'Next →'}
                  breakLabel={'...'}
                  pageCount={totalPages}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChange}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  disabledClassName={'disabled'}
                />
              )}
            </>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </>
      )}
    </>
  );
};

export default PostPage;
