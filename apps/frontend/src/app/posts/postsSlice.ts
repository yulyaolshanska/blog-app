import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../../shared/types/types';
import { fetchPosts, addPost, editPost, removePost } from './postsThunks';
import { ErrorMessages } from '../../shared/enums/ErrorMessages';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loading = false;
        state.error = ErrorMessages.FETCH_POSTS_FAILED;
      })

      .addCase(addPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, state => {
        state.loading = false;
        state.error = ErrorMessages.ADD_POST_FAILED;
      })

      .addCase(editPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        const index = state.posts.findIndex(
          post => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(editPost.rejected, state => {
        state.loading = false;
        state.error = ErrorMessages.EDIT_POST_FAILED;
      })

      .addCase(removePost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(removePost.rejected, state => {
        state.loading = false;
        state.error = ErrorMessages.REMOVE_POST_FAILED;
      });
  }
});

export default postsSlice.reducer;
