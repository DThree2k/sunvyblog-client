import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./singlePostAdmin.scss";
import DOMPurify from 'dompurify';
import { Dropdown } from "react-bootstrap";
import { FaEye, FaComment, FaEllipsisH } from "react-icons/fa";
import { SERVER_URL, PF } from "../../config/config";
import SidebarAdmin from "../../components/admin/sidebarAdmin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/navbarAdmin/NavbarAdmin";
import ScrollButton from "../../components/Layout/scrollButton/ScrollButton ";

function SinglePostAdmin() {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const queryParams = new URLSearchParams(location.search);
  const reportId = queryParams.get("report_id");
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [statusReport, setStatusReport] = useState("");
  const [statusPost, setStatusPost] = useState("");
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
      const res = await axios.get(SERVER_URL + "/posts/admin/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      if (res.data.status) {
        setStatusReport('Xác nhận báo cáo')
        setStatusPost('Ẩn bài viết')
      }
      else {
        setStatusReport('Huỷ báo cáo')
        setStatusPost('Hiện bài viết')
      }
    };
    getPost();
  }, [path]);
  const handleApproved = async () => {
    try {
      await axios.put(`${SERVER_URL}/posts/lock/${path}`, { status: false });
      await axios.put(`${SERVER_URL}/reports/${reportId}`, { status: 'approved' })
    } catch (error) {
      console.log(error);
    }
    setStatusReport('Huỷ báo cáo')
  };
  const handleRejected = async () => {
    try {
      await axios.put(`${SERVER_URL}/posts/lock/${path}`, { status: true });
      await axios.put(`${SERVER_URL}/reports/${reportId}`, { status: 'rejected' })
    } catch (error) {
      console.log(error);
    }
    setStatusReport('Xác nhận báo cáo')
  };
  const handleChangeStatusPost = async (statusP) => {
    try {
      await axios.put(`${SERVER_URL}/posts/lock/${path}`, { status: statusP });
    } catch (error) {
      console.log(error);
    }
    statusPost === 'Hiện bài viết' ? setStatusPost('Ẩn bài viết') : setStatusPost('Hiện bài viết')
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
      <ScrollButton />
      <div className="list">
        <SidebarAdmin />
        <div className="listContainer">
          <NavbarAdmin statusReport={statusReport}/>
          <div className="singlePost">
            <div className="singlePostWrapper">
              <div className="singlePostContain">
                <h1 className="singlePostTitle">{title}</h1>
                <div className="BlogDetail_header">
                  <div className="BlogDetail_user">
                    <div className="FallbackAvatar_avatar" >
                      <img src={post.profilePic === "" ? "/avatar_default.png" : PF + post.profilePic} alt="Avarta" />
                    </div>
                    <div className="BlogDetail_info">
                      <span className="BlogDetail_name">{post.username}</span>
                      <p className="BlogDetail_time">{timeAgo(post.createdAt)}</p>
                    </div>
                  </div>
                  <div className="BlogDetail_actions">
                    <span className="view-count"><FaEye /> {post.views || 0}</span>
                    <span className="comment-count"><FaComment /> {post.comments?.length || 0}</span>

                    <div className="BlogDetail_optionBtn">
                      <Dropdown className="avatar-dropdown">
                        <Dropdown.Toggle id="dropdown-basic">
                          <FaEllipsisH />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {reportId ?<><Dropdown.Item onClick={ handleApproved}>Xác nhận báo cáo</Dropdown.Item>
                            <Dropdown.Item onClick={handleRejected}>Huỷ báo cáo</Dropdown.Item></> :
                            <Dropdown.Item onClick={() => handleChangeStatusPost(statusPost === 'Hiện bài viết' ? true : false)}>{statusPost}</Dropdown.Item>
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                  </div>
                </div>
                <div className="MarkdownParser_wrapper BlogDetail_markdownParser">
                  <div className="show" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc) }} />
                  <div className="tag">
                    {post.categories.map((category, index) => (
                      <button
                        key={index}
                        className="btnCategory"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SinglePostAdmin