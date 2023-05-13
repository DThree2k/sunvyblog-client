import { Carousel, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaEye, FaComment } from 'react-icons/fa';
import './relatedPosts.scss'

function RelatedPosts({ posts }) {
  const chunkedPosts = chunkArray(posts, 4); // Phân chia mảng bài đăng thành các mảng con có kích thước là 4
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
    <Carousel controls={false}>
      {chunkedPosts.slice(0, 3).map((chunk, index) => ( // Lặp qua 3 phần tử đầu tiên của mảng các mảng con
        <Carousel.Item key={index}>
          <div className="d-flex contain-item">
            {chunk.map((post, i) => ( // Lặp qua các bài đăng trong mỗi mảng con
              <Card key={i}>
                    <Card.Body>
                          <Card.Title>
                          <Link to={`/post/${post.id}`} className="link">
                            {post.title}</Link></Card.Title>
                          <Card.Text>
                            <div ><Link className='link link-user' to={`/?user=${post.username}`}>{post.username}</Link></div>    
                            <span>{timeAgo(post.createdAt)}</span>
                          <div className="card-view">
                            <span className="view-count"><FaEye /> {post.views || 0}</span>
                            <span className="comment-count"><FaComment /> {post.comments?.length || 0}</span>
                          </div>


                          </Card.Text>
                        </Card.Body>
                       
                  </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

// Hàm phân chia mảng thành các mảng con
function chunkArray(arr, size) {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / size);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // Tạo mảng con mới nếu chưa có
    }

    resultArray[chunkIndex].push(item); // Thêm phần tử vào mảng con

    return resultArray;
  }, []);
}

export default RelatedPosts;
