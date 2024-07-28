import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../reducers/postSlice';
import Card from '../components/Card';

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.entity);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts) {
      console.log(posts);
    }
  }, [posts]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {posts && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Card key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
