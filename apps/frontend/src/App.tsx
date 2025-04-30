import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { AppRoute } from './shared/constants/appRoutes';
import { Loader } from './components/loader/Loader';

const HomePage = lazy(() => import('./pages/Home'));
const PostDetailsPage = lazy(() => import('./pages/PostPage'));
const CreatePostPage = lazy(() => import('./pages/CreatePostPage'));
const EditPostPage = lazy(() => import('./pages/EditPostPage'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={AppRoute.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/post/:id" element={<PostDetailsPage />} />
            <Route path={AppRoute.CREATE_POST} element={<CreatePostPage />} />
            <Route path="/edit/:id" element={<EditPostPage />} />
          </Route>
          <Route path={AppRoute.ANY} element={<Navigate to={AppRoute.HOME} replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
