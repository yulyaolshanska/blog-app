import { createAsyncThunk } from '@reduxjs/toolkit';

import { getComments, createComment } from '../../api/comments';
import { Comment } from '../../shared/types/types';
import type { CommentSchema } from '../../schemas/commentSchema';

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async postId => {
    return await getComments(postId);
  }
);

export const addComment = createAsyncThunk<
  Comment,
  { postId: number; commentData: CommentSchema }
>('comments/addComment', async ({ postId, commentData }) => {
  return await createComment(postId, commentData);
});
