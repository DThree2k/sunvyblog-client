import "./sidebarAdmin.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../../context/Context";
import { useContext } from "react";

const SidebarAdmin = () => {
  const history = useHistory();
  const { dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT", });
    history.push("/login");
  };
  return (
    <div className="sidebarAdmin">
      <div className="topsidebarAdmin">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logoAdmin">sunvyadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">TRANG ADMIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Bảng điều khiển</span>
          </li>
          </Link>
          <p className="title">DANH SÁCH</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Danh sách người dùng</span>
            </li>
          </Link>
          <Link to="/admin/posts" style={{ textDecoration: "none" }}>
            <li>
              <ArticleOutlinedIcon className="icon" />
              <span>Danh sách bài viết</span>
            </li>
          </Link>
          <Link to="/admin/tags" style={{ textDecoration: "none" }}>
          <li>
            <CategoryOutlinedIcon className="icon" />
            <span>Danh sách thể loại</span>
          </li>
          </Link>
          <p className="title">BÁO CÁO</p>
          <Link to="/admin/reports" style={{ textDecoration: "none" }}>
            <li>
            <ArticleOutlinedIcon className="icon" />
              <span>Danh sách báo cáo</span>
            </li>
          </Link>
          <p className="title">ADMIN</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Đổi mật khẩu</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span >Đăng xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
