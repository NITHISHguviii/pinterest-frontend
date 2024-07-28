import React, { Fragment } from 'react'
import PortTypePieChart from '../components/PortTypePiechart';
import { useSelector } from 'react-redux';
function Explore() {
  const posts = useSelector((state) => state.posts.entity);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  return (<Fragment>
    <div className="text-center text-4xl font-mono">Explore</div>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
      {posts && (
        <div>
          <PortTypePieChart data={posts} />
        </div>
      )}
      </Fragment>
  )
}

export default Explore