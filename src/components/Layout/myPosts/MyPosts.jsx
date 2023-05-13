import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import DOMPurify from 'dompurify';
import { PF } from "../../../config/config";
import { FaEye, FaComment } from 'react-icons/fa';
// import { SERVER_URL } from "../../../config/config";
// import axios from "axios";
import './myPosts.scss'

function MyPosts({ posts, flag, handleDeleteBookmark, handleDeleteMyPost }) {
    const [visiblePosts, setVisiblePosts] = useState(6);
    const history = useHistory()
    const handleLoadMore = () => {
        setVisiblePosts(visiblePosts + 6);
    };
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
    if(posts.length === 0) {
        return  <div className="no-post"><span>Không có bài viết nào.</span></div>
        
    }
    return (
        <>
            {Array.isArray(posts) &&
                posts.slice(0, visiblePosts).map(post => (
                    <div className="PostItem_wrapper">
                        <div className="PostItem_wrapper__5s6Lk">
                            {!flag ? (<><div className="PostItem_header__kJhep"><Link className="link" to={`/?user=${post.username}`}>
                                <div className="PostItem_author__-CiNM">
                                    <img src={post.profilePic === '' ? "/avatar_default.png" : PF + post.profilePic} alt="avatar" />
                                    <span>{post.username}</span>
                                </div>
                            </Link>
                                <div className="PostItem_actions__eWV5m">
                                    <i
                                        className="singlePostIcon far fa-trash-alt"
                                    onClick={handleDeleteBookmark(post.id)}
                                    ></i>
                                </div>
                            </div>
                            </>
                            ) : (<div className="PostItem_header__right" ><div className="PostItem_actions__eWV5m">
                                <i
                                    className="singlePostIcon far fa-edit"
                                onClick={() => history.push(`/post/${post.id}/update`)}
                                ></i>
                                <i
                                    className="singlePostIcon far fa-trash-alt"
                                onClick={handleDeleteMyPost(post.id)}
                                ></i>
                            </div></div>)}
                            <div className="PostItem_body__Fnfo-">
                                <div className="PostItem_info__DZr39">
                                    <Link to={`/post/${post.id}`} className="link"><h2 className="PostItem_title__8lSHm">{post.title}</h2></Link>
                                    <div className="PostItem_desc__be9G8"><div className="show" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }} /></div>
                                    <div className="PostItem_info__DZr3">
                                        <span>{timeAgo(post.createdAt)}</span>
                                        <span className="view-count"><FaEye /> {post.views || 0}</span>
                                        <span className="comment-count"><FaComment /> {post.comments?.length || 0}</span>
                                    </div>
                                </div>
                                <div className="PostItem_thumb__m4iXl">
                                    <Link to={`/post/${post.id}`} className="link">
                                        <img src={PF + post.photo} alt={post.photo} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                )) }
            {visiblePosts < posts.length && (
                <button className="btn-see-more" onClick={handleLoadMore}>Xem thêm</button>
            )}

        </>
    );
}

export default MyPosts;