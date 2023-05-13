import React, { useState } from "react";
import Posts from "../posts/Posts";
import './postList.scss'

function PostList({ posts }) {
    const [visiblePosts, setVisiblePosts] = useState(6);

    const handleLoadMore = () => {
        setVisiblePosts(visiblePosts + 6);
      };

  return (
    <div className="home">
            <Posts posts={posts.slice(0, visiblePosts)} />
            {visiblePosts < posts.length && (
              <button className="btn-see-more" onClick={handleLoadMore}>Xem tiếp</button>
            )}
          </div>
  );
}

export default PostList;
