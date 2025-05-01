# 📝 Blog App Monorepo

A simple blog application built with **React**, **TypeScript**, and **Redux**. Users can create, edit, view, and delete posts, as well as add comments.

---

## Features

- ✅ View a list of blog posts
- ✅ View post details and associated comments
- ✅ Add, edit, and delete posts
- ✅ Add comments to posts
- ✅ Pagination for comments and posts
- ✅ Error handling and loading states
- ✅ React Router for navigation
- ✅ TypeScript support

## Tech Stack

- **React**
- **Redux Toolkit**
- **React Router DOM**
- **TypeScript**
- **React Paginate**
- **Toastify**
- **Typeorm**
- **Nest**
- **Postgres**
- **CSS Modules**

## Getting Started

### .env for backend

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=blog_db
```

### 1. Clone the repository

```bash
git clone https://github.com/yulyaolshanska/blog-app.git
cd blog-app

```

### 2. Install dependencies

```bash
npm install
# or
yarn install

```

### 3. 🚀 Run frontend and backend separately

```bash
npm run dev:backend   # Runs the NestJS backend (localhost:3000)
npm run dev:frontend  # Runs the React frontend (usually localhost:5173)
```

OR 🔁 Run both frontend & backend concurrently

```bash
npm run dev
```

---

## 📁 Folder Structure

```
.
├── apps
│   ├── backend      # NestJS API
│   └── frontend     # React + Vite frontend
```

## 📦 Backend API

## 🚀 Backend API Routes

**Base URL:** `http://localhost:3000`

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/posts`     | Get all posts           |
| GET    | `/posts/:id` | Get a post by ID        |
| POST   | `/posts`     | Create a new post       |
| PUT    | `/posts/:id` | Update an existing post |
| DELETE | `/posts/:id` | Delete a post           |

---

#### Comments

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/posts/:id/comments` | Add comment to a post     |
| GET    | `/posts/:id/comments` | Get a comments by blog ID |

---

## 🧩 Entities

### 🧾 Post

```ts
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```

💬 Comment

```ts
interface Comment {
  id: number;
  postId: number;
  content: string;
  createdAt: Date;
}
```
