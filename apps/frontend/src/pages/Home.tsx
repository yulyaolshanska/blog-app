import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { fetchPosts } from '../app/posts/postsThunks';
import { RootState } from '../app/store';
import { PostList } from '../components/postList/PostList';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { Loader } from '../components/loader/Loader';
import { POSTS_PER_PAGE } from '../shared/constants/constants';

import styles from '../styles/common.module.css';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const { posts, loading, totalPages } = useAppSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts({ limit: POSTS_PER_PAGE, page: currentPage + 1 }));
  }, [dispatch, currentPage]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <h1 className={styles.title}>Blog Posts</h1>
      {loading && <Loader />}
      {posts.length !== 0 ? (
        <>
          <PostList posts={posts} />
          {totalPages > 1 && (
            <ReactPaginate
              previousLabel={'← Prev'}
              nextLabel={'Next →'}
              breakLabel={'...'}
              pageCount={totalPages}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              disabledClassName={'disabled'}
            />
          )}
        </>
      ) : (
        <p className={styles.nothingFound}>
          Oops! No posts to show right now. Check back later!
        </p>
      )}
    </>
  );
};

export default Home;
