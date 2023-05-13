import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../../context/Context";
import "./singlePost.scss";
import { Form, Button, Dropdown } from "react-bootstrap";
import DOMPurify from 'dompurify';
import { FaEllipsisH, FaFacebook, FaFlag, FaLink, FaEye, FaComment, FaTwitter, FaPen, FaTrash, FaBookmark } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';
import { SERVER_URL, PF } from "../../../config/config";
import RelatedPosts from "../relatedPosts/RelatedPosts";
function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const username = user ? user.username : null;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [authorPosts, setAuthorPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [note, setNote] = useState("");
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [isReport, setIsReport] = useState(false)
  const dialogWrapperRef = useRef(null);
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
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(SERVER_URL + "/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    const getRelatedPosts = async () => {
      const related = await axios.get(SERVER_URL + "/posts/" + path + "/related");
      setRelatedPosts(related.data);
    };
    const getAuthorPosts = async () => {
      const author = await axios.get(SERVER_URL + "/posts/" + path + "/author");
      setAuthorPosts(author.data);
    };
    getPost();
    getRelatedPosts()
    getAuthorPosts()

  }, [path]);

  useEffect(() => {
    const isBookmark = async () => {
      const isB = await axios.get(`${SERVER_URL}/posts/${path}/bookmarks?username=${username}`);
      setIsBookmarked(isB.data);
    };
    isBookmark()
  }, [path, username])
  const handleCopyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setNote("Đã sao chép liên kết");
    setTimeout(() => {
      setNote("");
    }, 3000);
  }
  const handleReport = () => {
    setIsReport(true);

  }
  const handleSubmit = async () => {
    try {
      const newComment = {
        profilePic: user.profilePic,
        username: username,
        commentText: commentText,
      }
      const res = await axios.post(`${SERVER_URL}/posts/${post.id}`, newComment);
      setPost(res.data); // cập nhật post để hiển thị comment mới nhất
      setCommentText(""); // reset comment text sau khi submit thành công
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleContentChange = (event) => {
    setReportContent(event.target.value);
  };

  const handleSubmitReport = async (event) => {
    event.preventDefault();
    const content = selectedOption + ". Nhận xét: " + reportContent
    try {
      await axios.post(`${SERVER_URL}/reports`, {
        post: path,
        user: user._id,
        reason: content,
      });
      setIsReport(false);
      setNote("Đã báo cáo bài viết");
      setTimeout(() => {
        setNote("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };
  const shareUrl = window.location.href;
  const handleDelete = async () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xoá bài viết này không?");
    if (confirmed) {
      try {
        await axios.delete(`${SERVER_URL}/posts/${post.id}`, {
          data: { username: username },
        });
        history.push("/");
      } catch (err) { }
    }
  };

  const handleUpdate = async () => {
    history.push(`/post/${path}/update`);
  };
  const handleBookmark = async () => {
    if (!isBookmarked) {
      try {
        await axios.post(`${SERVER_URL}/posts/${path}/${username}`);
        setIsBookmarked(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.delete(`${SERVER_URL}/posts/${path}/${username}`);
        setIsBookmarked(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (!post || Object.keys(post).length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        <img src="/loading-icon.gif" alt="loading" style={{ objectFit: "cover" }} />
      </div>
    );
  }

  return (
    <>

      {user && username !== post.username && <button className={isBookmarked ? "bookmark-button dark" : "bookmark-button bland"} onClick={handleBookmark}>
        <FaBookmark size={24} className="bookmark-icon" color={isBookmarked ? '#f05123' : '#adb5bd'} />
      </button>}
      {note && <div className="note">
        <span>{note}</span>
      </div>}
      <div className="singlePost">
        <div className="singlePostWrapper">
          <div className="singlePostContain">
            <h1 className="singlePostTitle">{title}</h1>
            <div className="BlogDetail_header">
              <div className="BlogDetail_user">
                <Link to={`/?user=${post.username}`}>
                  <div className="FallbackAvatar_avatar" >
                    <img src={post.profilePic === "" ? "/avatar_default.png" : PF + post.profilePic} alt="Avarta" />
                  </div>
                </Link>
                <div className="BlogDetail_info">
                  <Link className="link" to={`/?user=${post.username}`}>
                    <span className="BlogDetail_name">{post.username}</span>
                  </Link>
                  <p className="BlogDetail_time">{timeAgo(post.createdAt)}</p>
                </div>
              </div>

              <div className="BlogDetail_actions">
                <span className="view-count"><FaEye /> {post.views || 0}</span>
                <span className="comment-count"><FaComment /> {post.comments?.length || 0}</span>
                <div className="BlogDetail_optionBtn">
                  {isReport && (
                    <div ref={dialogWrapperRef} className="dialog__wrapper">
                      <div className="dialog dialog--small">
                        <div className="dialog__header">
                          <h3>Nội dung báo cáo</h3>
                          <Button variant="light" onClick={() => setIsReport(false)}>
                            <i className="fas fa-times"></i>
                          </Button>
                        </div>
                        <Form onSubmit={handleSubmitReport}>
                          <Form.Group >
                          <Form.Label><span style={{ color: 'red' }}>*</span> Lý do báo cáo nội dung này:</Form.Label>
                          </Form.Group>

                          <Form.Group>
                            <Form.Check
                              type="radio"
                              label="Spam"
                              name="reportOption"
                              value="Spam"
                              onChange={handleOptionChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Vi phạm điều khoản"
                              name="reportOption"
                              value="Vi phạm điều khoản"
                              onChange={handleOptionChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Quấy rối"
                              name="reportOption"
                              value="Quấy rối"
                              onChange={handleOptionChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Vi phạm bản quyền"
                              name="reportOption"
                              value="Vi phạm bản quyền"
                              onChange={handleOptionChange}
                            />
                          </Form.Group>

                          <Form.Group className="text-report">
                            <Form.Control
                              as="textarea"
                              maxLength={255}
                              placeholder="Nhận xét (tối đa 255 ký tự)"
                              rows={2}
                              value={reportContent}
                              onChange={handleContentChange}
                            />
                          </Form.Group>
                          <div className="btnReport">
                            <Button className="btn-report" variant="primary" type="submit">
                              Báo cáo
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  )}
                  <Dropdown className="avatar-dropdown">
                    <Dropdown.Toggle id="dropdown-basic">
                      <FaEllipsisH />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {username === post.username &&
                        <>
                          <Dropdown.Item onClick={handleUpdate} ><FaPen /> Sửa bài viết</Dropdown.Item>
                          <Dropdown.Item onClick={handleDelete} ><FaTrash /> Xoá bài viết</Dropdown.Item>
                          <Dropdown.Divider />
                        </>
                      }

                      <Dropdown.Item href={`https://www.facebook.com/sharer.php?u=${shareUrl}`}><FaFacebook /> Chia sẻ lên Facebook</Dropdown.Item>
                      <Dropdown.Item href={`https://twitter.com/share?url=${shareUrl}&text=${title}&via=${post.username}&hashtags=${post.categories}`}><FaTwitter /> Chia sẻ lên Twitter</Dropdown.Item>
                      <Dropdown.Item href={`mailto:?subject=${title}. &body=${shareUrl}`} ><MdEmail /> Chia sẻ tới Email</Dropdown.Item>
                      <Dropdown.Item onClick={handleCopyLink}><FaLink /> Sao chép liên kết</Dropdown.Item>
                      {user && !user.isAdmin && username !== post.username && <><Dropdown.Divider /><Dropdown.Item onClick={handleReport}><FaFlag />Báo cáo bài viết</Dropdown.Item></>}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="MarkdownParser_wrapper BlogDetail_markdownParser">
              <div className="show" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc) }} />
              <div className="BlogDetail_optionBtn-bot">
                <Dropdown className="avatar-dropdown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <FaEllipsisH />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {username === post.username &&
                      <>
                        <Dropdown.Item onClick={handleUpdate} ><FaPen /> Sửa bài viết</Dropdown.Item>
                        <Dropdown.Item onClick={handleDelete} ><FaTrash /> Xoá bài viết</Dropdown.Item>
                        <Dropdown.Divider />
                      </>
                    }
                    <Dropdown.Item href={`https://www.facebook.com/sharer.php?u=${shareUrl}`}><FaFacebook /> Chia sẻ lên Facebook</Dropdown.Item>
                    <Dropdown.Item href={`https://twitter.com/share?url=${shareUrl}&text=${title}&via=${post.username}&hashtags=${post.categories}`}><FaTwitter /> Chia sẻ lên Twitter</Dropdown.Item>
                    <Dropdown.Item href={`mailto:?subject=${title}. &body=${shareUrl}`} ><MdEmail /> Chia sẻ tới Email</Dropdown.Item>
                    <Dropdown.Item onClick={handleCopyLink}><FaLink /> Sao chép liên kết</Dropdown.Item>
                    {user && !user.isAdmin && username !== post.username && <><Dropdown.Divider /><Dropdown.Item onClick={handleReport}><FaFlag />Báo cáo bài viết</Dropdown.Item></>}

                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="tag">
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
              </div>
            </div>
          </div>
          {relatedPosts && <><h3>Bài viết liên quan</h3>
            <RelatedPosts posts={relatedPosts} /></>}
          {authorPosts && <><h3>Bài viết khác từ {post.username}</h3>
            <RelatedPosts posts={authorPosts} /></>}
          {/* Phần comment */}
          <div className="comments">
            <h3>Bình luận</h3>
            {/* Hiển thị các comment đã có */}
            {post.comments && post.comments.map(comment => (
              <div className="BlogDetail_body" key={comment._id}>
                <div className="BlogComment_user">
                  <div className="FallbackAvatar_avatar">
                    <img src={comment.profilePic === '' ? "/avatar_default.png" : PF + comment.profilePic} alt="avatar" />
                  </div>
                  <div className="BlogDetail_info">
                    <div className="blog-comment">
                      <span className="BlogDetail_name">{comment.username}</span>
                      <p className="commentText">{comment.commentText}</p></div>
                    <span className="BlogDetail_time">{timeAgo(comment.createdAt)}</span>
                  </div>
                </div>


              </div>
            ))}

            {/* Nếu đăng nhập rồi thì cho phép người dùng đăng comment */}
            {user &&
              <form className="commentForm" onSubmit={handleSubmit}>
                <textarea
                  className="commentInput"
                  placeholder="Viết bình luận của bạn..."
                  onChange={(e) => setCommentText(e.target.value)}
                  value={commentText}
                  required
                ></textarea>
                <button className="commentButton" type="submit">Đăng</button>
              </form>
            }

            {/* Nếu chưa đăng nhập thì yêu cầu người dùng đăng nhập */}
            {!user &&
              <Link className="link" to='/login'> <p>Bạn phải đăng nhập để bình luận.</p></Link>
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default SinglePost