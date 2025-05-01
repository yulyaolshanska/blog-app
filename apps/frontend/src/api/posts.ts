import axios from 'axios';

import { API_URL } from '../shared/constants/constants';
import { CreatePostDto, Post, UpdatePostDto } from '../shared/types/post.types';

export const getPosts = async ({
  limit,
  page
}: {
  limit: number;
  page: number;
}) => {
  try {
    const response = await axios.get(
      `${API_URL}/posts?limit=${limit}&page=${page}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching posts', error);
    throw error;
  }
};

export const getPostById = async (postId: number): Promise<Post> => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching posts', error);
    throw error;
  }
};

export const createPost = async (postData: CreatePostDto) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);

    return response.data;
  } catch (error) {
    console.error('Error creating post', error);
    throw error;
  }
};

export const updatePost = async (id: number, postData: UpdatePostDto) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, postData);

    return response.data;
  } catch (error) {
    console.error('Error updating post', error);
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`);
  } catch (error) {
    console.error('Error deleting post', error);
    throw error;
  }
};
