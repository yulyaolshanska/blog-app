export enum ErrorMessages {
  // Validation
  REQUIRED = 'This field is required.',
  TITLE_TOO_SHORT = 'Title is too short.',
  TITLE_TOO_LONG = 'Title is too long.',
  CONTENT_TOO_SHORT = 'Content is too short.',
  CONTENT_TOO_LONG = 'Content is too long.',
  COMMENT_TOO_LONG = 'Comment is too long.',
  FETCH_ERROR = 'Something went wrong while fetching data.',
  // APP
  FETCH_POSTS_FAILED = 'Failed to fetch posts',
  ADD_POST_FAILED = 'Failed to add post',
  EDIT_POST_FAILED = 'Failed to edit post',
  REMOVE_POST_FAILED = 'Failed to remove post',
  FETCH_COMMENTS_FAILED = 'Failed to fetch comments',
  ADD_COMMENT_FAILED = 'Failed to add comment'
}
