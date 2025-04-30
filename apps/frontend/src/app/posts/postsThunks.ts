import { createAsyncThunk } from '@reduxjs/toolkit';

import { getPosts, createPost, updatePost, deletePost } from '../../api/posts';
import { Post, CreatePostDto } from '../../shared/types/types';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    return await getPosts();
  }
);

export const addPost = createAsyncThunk<Post, CreatePostDto>(
  'posts/addPost',
  async postData => {
    return await createPost(postData);
  }
);

export const editPost = createAsyncThunk<
  Post,
  { id: number; postData: CreatePostDto }
>('posts/editPost', async ({ id, postData }) => {
  return await updatePost(id, postData);
});

export const removePost = createAsyncThunk<number, number>(
  'posts/removePost',
  async id => {
    await deletePost(id);
    return id;
  }
);
