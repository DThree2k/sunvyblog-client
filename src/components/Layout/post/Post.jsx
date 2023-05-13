import "./post.scss";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { FaEye, FaComment } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { PF } from "../../../config/config";

const Post = ({ post }) => {

  // Hàm chuyển đổi thời gian thành thời gian cách hiện tại
  const timeAgo = (time) => {
    const current = new Date();
    const previous = new Date(time);
    const diff = current.getTime() - previous.getTime();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;

    if (diff < minute) {
      return "vừa xong";
    } else if (diff < hour) {
      return Math.floor(diff / minute) + " phút trước";
    } else if (diff < day) {
      return Math.floor(diff / hour) + " giờ trước";
    } else if (diff < week) {
      return Math.floor(diff / day) + " ngày trước";
    } else {
      return new Date(time).toLocaleDateString();
    }
  }
  return (
    <Card className="card">
      <Link to={`/post/${post.id}`} className="link">
        <Card.Img variant="top" src={PF + post.photo} />
      </Link>
        <Card.Body>
        <Link to={`/post/${post.id}`} className="link">
          <Card.Title>{post.title}</Card.Title>
        </Link>
          <Card.Subtitle>
          {post.categories.map((category, index) => (
                <button
                  key={index}
                  className="btnCategory"
                >
                  <Link className="link" to={`/?cat=${category}`}>
              {category}
              </Link>
                </button>
              ))}
          </Card.Subtitle>
          <Card.Text className="desc"><div className="show" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }} /></Card.Text>
        </Card.Body>
        <Card.Body className="body-wrapper">
          <div className="card-wrapper">
            <div className="card-info">
            <Link to={`/?user=${post.username}`}>
              <img src={post.profilePic === '' ? "/avatar_default.png" : PF + post.profilePic} alt="avatar" />
              </Link> 
              <div>
              <Link className="link" to={`/?user=${post.username}`}>
                <div>{post.username}</div>
                </Link>
                <div>{timeAgo(post.createdAt)}</div>
              </div>
            </div>
            <div className="card-view">
              <span className="view-count"><FaEye /> {post.views || 0}</span>
              <span className="comment-count"><FaComment /> {post.comments?.length || 0}</span>
            </div>
          </div>
        </Card.Body>
    </Card>
  );
}

export default Post;
