# 📝 Blog App

A simple blog application built with **React**, **TypeScript**, and **Redux**. Users can create, edit, view, and delete posts, as well as add comments.

---

## 📦 Features

- View a list of blog posts
- Create a new post
- Edit an existing post
- Delete a post
- Add and view comments on each post
- Responsive UI with modular CSS

---

## 🚀 Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Hook Form + Zod (form validation)
- React Router
- CSS Modules

---

## 📦 Backend API

### Endpoints

#### Posts

- `GET /posts` – Get all posts
- `GET /posts/:id` – Get a single post
- `POST /posts` – Create a new post
- `PUT /posts/:id` – Edit a post
- `DELETE /posts/:id` – Delete a post

#### Comments

- `POST /posts/:id/comments` – Add comment to a post

---

## 🧩 Entities

### 🧾 Post

```ts
interface Post {
  id: number;
  title: string;
  content: string;
}
```

💬 Comment

```ts
interface Comment {
  id: number;
  postId: number;
  content: string;
}
```
