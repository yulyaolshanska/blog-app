import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchComments, addComment } from './commentsThunks';
import { Comment } from '../../shared/types/types';
import { ErrorMessages } from '../../shared/enums/ErrorMessages';

type CommentsState = {
  commentsByPostId: Record<number, Comment[]>;
  currentPage: number;
  totalPagesByPostId: Record<number, number>;
  loading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  commentsByPostId: {},
  currentPage: 1,
  totalPagesByPostId: {},
  loading: false,
  error: null
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
     .addCase(fetchComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments, totalPages } = action.payload;
        state.commentsByPostId[postId] = comments;
        state.totalPagesByPostId[postId] = totalPages;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, state => {
        state.loading = false;
        state.error = ErrorMessages.FETCH_COMMENTS_FAILED;
      })

      .addCase(addComment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.loading = false;
          const comment = action.payload;
          const postId = comment.postId;

          if (!state.commentsByPostId[postId]) {
            state.commentsByPostId[postId] = [];
          }

          state.commentsByPostId[postId].unshift(comment);
        }
      )
      .addCase(addComment.rejected, state => {
        state.loading = false;
        state.error = ErrorMessages.ADD_COMMENT_FAILED;
      });
  }
});

export default commentsSlice.reducer;
