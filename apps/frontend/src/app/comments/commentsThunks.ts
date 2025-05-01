import { createAsyncThunk } from '@reduxjs/toolkit';

import { getComments, createComment } from '../../api/comments';
import { Comment } from '../../shared/types/types';
import type { CommentSchema } from '../../schemas/commentSchema';

type FetchCommentsParams = {
  postId: number;
  limit: number;
  page: number;
};

type FetchCommentsResponse = {
  postId: number;
  comments: Comment[];
  totalPages: number;
};

export const fetchComments = createAsyncThunk<
  FetchCommentsResponse,
  FetchCommentsParams
>('comments/fetchComments', async ({ postId, limit, page }) => {
  return await getComments(postId, limit, page);
});

export const addComment = createAsyncThunk<
  Comment,
  { postId: number; commentData: CommentSchema }
>('comments/addComment', async ({ postId, commentData }) => {
  return await createComment(postId, commentData);
});
