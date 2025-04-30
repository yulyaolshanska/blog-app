import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchComments, addComment } from './commentsThunks';
import { Comment } from '../../shared/types/types';
import { ErrorMessages } from '../../shared/enums/ErrorMessages';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
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
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loading = false;
          state.comments = action.payload;
        }
      )
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
          state.comments.push(action.payload);
        }
      )
      .addCase(addComment.rejected, state => {
        state.loading = false;
        state.error = ErrorMessages.ADD_COMMENT_FAILED;
      });
  }
});

export default commentsSlice.reducer;
