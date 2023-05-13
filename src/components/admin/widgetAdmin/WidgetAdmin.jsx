import "./widgetAdmin.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../../../config/config"; 
import { Link } from "react-router-dom";
import axios from "axios";
const WidgetAdmin = ({ type }) => {
  let data;
  const [total, setTotal] = useState({});
  useEffect(() => {
    const fetchTotal = async () => {
        const res = await axios.get(SERVER_URL + "/posts/stats");
        setTotal(res?.data ?? {});
    };
    fetchTotal();
  },[]);
  switch (type) {
    case "user":
      data = {
        title: "DANH SÁCH NGƯỜI DÙNG",
        linkto: "users",
        link: "Xem tất cả người dùng",
        totals:total.totalUsers,
        icon: (
          <PersonOutlinedIcon
            className="iconWidgetAdmin"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "post":
      data = {
        title: "DANH SÁCH BÀI VIẾT",
        link: "Xem tất cả các bài viết",
        linkto: "posts",
        totals:total.totalPosts,
        icon: (
          <ArticleOutlinedIcon
            className="iconWidgetAdmin"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
      case "tag":
        data = {
          title: "CÁC THỂ LOẠI BÀI VIẾT",
          link: "Xem các thể loại bài viết",
          linkto: "tags",
          totals:total.totalCategories,
          icon: (
            <CategoryOutlinedIcon
            className="iconWidgetAdmin"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
            />
            ),
          };
          break;
          case "view":
            data = {
              title: "LƯỢT XEM",
              // link: "",
              totals:total.totalViews,
              icon: (
                <VisibilityOutlinedIcon
                  className="iconWidgetAdmin"
                  style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                />
              ),
            };
            break;
    default:
      break;
  }

  return (
    <div className="widgetAdmin">
      <div className="leftWidgetAdmin">
        <span className="titleWidgetAdmin">{data.title}</span>
        <span className="counter">
          {data.totals}
        </span>
        <Link className="link" to={`/admin/${data.linkto}`}>
        <span className="linkWidgetAdmin">{data.link}</span>
        </Link>
      </div>
      <div className="rightWidgetAdmin">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon />
          {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default WidgetAdmin;
