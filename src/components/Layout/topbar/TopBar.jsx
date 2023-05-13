import { useContext, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { Context } from "../../../context/Context";
import "./topbar.scss";
import Dropdown from 'react-bootstrap/Dropdown';
import { PF } from "../../../config/config";
import { SERVER_URL } from "../../../config/config";
export default function TopBar() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { user, dispatch } = useContext(Context);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT", });
    history.push("/login");
  };
  const handleViewMore = () => {
    setSearch("");
  };
  const handleChange = async (e) => {
    const query = e.target.value;
    setSearch(query);

    try {
      const response = await axios.get(`${SERVER_URL}/posts/search/${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="top">
      <div className="container-top container">
        <div className="top-left">
          <Link to="/"><img src="/sunvy_trang.png" alt="Sunvy" className="logo" /></Link>
        </div>
        {path !== 'write' && (
          <>
          <div className="NavBar_body__4Yhth d-flex-center">
            <div>
              <div className="Search_wrapper__Bwvae d-flex-center" aria-expanded="false">
                <div className="Search_searchIcon__-23JY"></div>
                <input type="text" className="Search_input__GnMba"
                  placeholder="Tìm kiếm bài viết theo tiêu đề, thẻ, tác giả ..." value={search} onChange={handleChange} />
              </div>
            </div>
            <div className="post-search">
              <ul className="Tippy-module_wrapper__1s5m5">
                {search.length !== 0 && <div className="Search_result__l1XFr">
                  {search.length === 0 ? (<></>) :
                    searchResults.length === 0 ? (<div className="Search_header__kdHdh">
                      <div className="Search_searchIcon__-23JY"></div>
                      <span>Không có kết quả cho '{search}'</span>
                    </div>) : (<div className="Search_header__kdHdh">
                      <div className="Search_searchIcon__-23JY"></div>
                      <span>Kết quả cho '{search}'</span>
                    </div>)}
                  {searchResults.length !== 0 && search.length !== 0 && <div className="Search_heading__XH96K"><h5>BÀI VIẾT</h5>
                    {searchResults.length > 6 && <Link to={`/?q=${search}`} className="link" onClick={handleViewMore}>Xem thêm</Link>}
                  </div>}
                  {search.length !== 0 && searchResults.slice(0, 6).map((post) => (
                    <div key={post.id}>
                      <Link className="link Search_searchItem__pVRo4" to={`/post/${post.id}`} onClick={handleViewMore}>
                        <div className="FallbackAvatar_avatar__gmj3S"><img className="photo" src={PF + post.photo} /></div>
                        <span>{post.title}</span>
                      </Link>
                    </div>
                  ))}
                </div>}
              </ul>
            </div>
          </div>
          </>
        )}
        
          <div className="top-right">
            {user ? (

              <>
                <Link className="link" to="/write">
                  Viết Blog
                </Link>
                <Dropdown className="avatar-dropdown">
                  <Dropdown.Toggle id="dropdown-basic">
                    <div className="btn-wrapper">
                      <span>Chào Mừng {user.username}</span>

                      <img src={user.profilePic === "" ? "/avatar_default.png" : (PF + user.profilePic)} alt="avatar" />
                    </div>

                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item ><Link to="/profile" className="link">Xem thông tin cá nhân</Link></Dropdown.Item>
                    {!user.isAdmin && <Dropdown.Item ><Link to="/settings" className="link">Cập nhật thông tin cá nhân</Link></Dropdown.Item>}
                    <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown></>
            ) : (
              <>
                <Link className="link" to="/login">
                  Đăng nhập
                </Link>
                <Link className="link" to="/register">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>

      </div>

      )
}
