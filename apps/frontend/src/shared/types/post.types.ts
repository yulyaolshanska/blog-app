export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostDto = {
  title: string;
  content: string;
};

export type UpdatePostDto = CreatePostDto;
