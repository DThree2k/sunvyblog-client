import "./profile.scss"
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { PF } from "../../config/config";
import { SERVER_URL } from "../../config/config";
import axios from "axios";
import MyPosts from "../../components/Layout/myPosts/MyPosts";

function Profile() {
    const [myPosts, setMyPosts] = useState([]);
    const [myPostsBookmark, setMyPostsBookmark] = useState([]);
    const [flag, setFlag] = useState(true);
    const [bookmarkDeleted, setBookmarkDeleted] = useState(false); // add bookmarkDeleted state variable
    const [myPostDeleted, setMyPostDeleted] = useState(false)
    const { user } = useContext(Context);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`${SERVER_URL}/posts?user=${user.username}`);
            setMyPosts(res.data);
        };
        const fetchPostsBookmark = async () => {
            const r = await axios.get(`${SERVER_URL}/posts/bookmards/${user.username}`);
            setMyPostsBookmark(r.data);
        };
        fetchPosts();
        fetchPostsBookmark();
      }, [user.username, bookmarkDeleted, myPostDeleted]);
      const handleDeleteBookmark = (id) => async () => {
        try {
          await axios.delete(`${SERVER_URL}/posts/${id}/${user.username}`);
          setBookmarkDeleted(!bookmarkDeleted); // toggle the bookmarkDeleted variable
        } catch (error) {
          console.log(error);
        }
      };
      const handleDeleteMyPost = (id) => async () => {
        try {
            const confirmed = window.confirm("Bạn có chắc chắn muốn xoá bài viết này không?");
            if (confirmed) {
                try {
                    await axios.delete(`${SERVER_URL}/posts/${id}`);
                    setMyPostDeleted(!myPostDeleted); // toggle the myPostDeleted variable
                } catch (err) { }
              }
        } catch (error) {
          console.log(error);
        }
      };
    const handleMyPosts = async () => {
        setFlag(true);  
    }
    const handleMyBookMark = async () => {
        setFlag(false);
        // const res = await axios.get(SERVER_URL + "/posts" + `?user=${user.username}`);
        // setPosts(res.data);
    }
    return (
        <>
            <div className="profile">
                <div className="profileWrapper">
                    <div className="profileTitle">
                        <span className="profileUpdateTitle">Thông tin cá nhân</span>
                    </div>
                    <div className="profileAvatar">
                        <img
                            src={user.profilePic === "" ? "/avatar_default.png" :  PF + user.profilePic}
                            alt="avatar"
                        />
                        <div className="profileInfo">
                            <span className="username">{user.username}</span>
                            <div className="btnprofileInfo">
                                {flag ? (<>
                                    <button className="btnInfo btn-dark" onClick={handleMyPosts}>Bài viết của tôi</button>
                                <button className="btnInfo btn-bland" onClick={handleMyBookMark}>Bài viết thêm dấu trang</button>
                                </>) : (<>
                                    <button className="btnInfo btn-bland" onClick={handleMyPosts}>Bài viết của tôi</button>
                                <button className="btnInfo btn-dark" onClick={handleMyBookMark}>Bài viết thêm dấu trang</button>
                                </>)}
                                
                            </div>
                        </div>
                    </div>
                    <div className="Blog_leftLayout__Kuc0z">
                        
                        {flag ? (<MyPosts posts={myPosts} flag={flag} handleDeleteMyPost={handleDeleteMyPost}/>) : (<MyPosts posts={myPostsBookmark} flag={flag} handleDeleteBookmark={handleDeleteBookmark}/>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;