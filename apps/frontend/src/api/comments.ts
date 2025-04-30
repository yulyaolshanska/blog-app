import axios from 'axios';

import { API_URL } from '../shared/constants/constants';

export const getComments = async (postId: number) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);

    return response.data;
  } catch (error) {
    console.error('Error fetching comments', error);
    throw error;
  }
};

export const createComment = async (
  postId: number,
  commentData: { content: string }
) => {
  try {
    const response = await axios.post(
      `${API_URL}/posts/${postId}/comments`,
      commentData
    );

    return response.data;
  } catch (error) {
    console.error('Error creating comment', error);
    throw error;
  }
};
