import Post from "../post/Post";
import "./posts.scss";

export default function Posts({ posts }) {
  // const reversedPosts = [...posts].reverse(); 
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );

}
