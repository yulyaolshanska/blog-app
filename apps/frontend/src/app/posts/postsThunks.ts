import { createAsyncThunk } from '@reduxjs/toolkit';

import { getPosts, createPost, updatePost, deletePost } from '../../api/posts';
import { Post, CreatePostDto } from '../../shared/types/types';

type FetchPostsParams = {
  limit: number;
  page: number;
};

type FetchPostsResponse = {
  posts: Post[];
  totalPages: number;
};

export const fetchPosts = createAsyncThunk<
  FetchPostsResponse,
  FetchPostsParams
>('posts/fetchPosts', async ({ limit, page }) => {
  const res = await getPosts({ limit, page });
  const totalPages = Math.ceil(res.totalCount / limit);

  return { posts: res.posts, totalPages };
});

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
