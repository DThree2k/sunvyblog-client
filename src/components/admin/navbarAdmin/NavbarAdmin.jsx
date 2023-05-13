import "./navbarAdmin.scss";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL, PF } from "../../../config/config";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";

const NavbarAdmin = ({ statusReport, dataReport  }) => {
  const { user } = useContext(Context);
  const [count, setCount] = useState(0)
  const [isReport, setIsReport] = useState(false)
  const [reportResults, setReportResults] = useState([]);
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
    const pendingCount = async () => {
      const res = await axios.get(`${SERVER_URL}/reports/pending-count`);
      setCount(res.data.count);
    };
    pendingCount()
  }, [isReport, statusReport, dataReport ])
  const handleReport = async (e) => {
    e.preventDefault();
    setIsReport(!isReport)
    try {
      const res = await axios.get(`${SERVER_URL}/reports`);
      setReportResults(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleViewReport = async () => {
    setIsReport(false);
    // try {
    //   const reportId = report._id;
    //   await axios.put(`${SERVER_URL}/reports/${reportId}`, { status: 'rejected' });
    // } catch (error) {
    //   console.log(error);
    // }
  }
  return (
    <div className="navbarAdmin">
      <div className="wrapperAdmin">
        <div className="items">
          <div className="item" onClick={handleReport}>
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            {count > 0 && <div className="counter">{count}</div>}
          </div>
          <div className="item">
            <span>Chào mừng {user.username}</span>
            <img
              src="/avatar_admin.png"
              alt="avatarAdmin"
              className="avatar"
            />
          </div>
        </div>
      </div>
      <div className="post-search">
        <ul className="Tippy-module_wrapper__1s5m5">
          {isReport && reportResults.length !== 0 &&
            <div className="Search_result__l1XFr">
              <div className="Search_heading__XH96K"><h5>THÔNG BÁO</h5>
                {reportResults.length > 6 &&
                  <Link to={`/admin/reports`} className="link" onClick={() => setIsReport(false)}>Xem thêm</Link>}
              </div>
              {reportResults.slice(0, 6).map((report) => (
                <div key={report._id} >
                  <Link className="link Search_searchItem__pVRo4" onClick={handleViewReport}
                    to={`/admin/posts/${report.post[0]._id}?report_id=${report._id}`}>
                    <div className="FallbackAvatar_avatar__gmj3S"><img className="photo" src={report.user[0].profilePic === '' ? '/avatar_default.png' : PF + report.user[0].profilePic} alt="" /></div>
                    <div className="key-report">
                      <span>{report.user[0].username} đã báo cáo bài viết {report.post[0].title}</span>
                      <span>Lý do: {report.reason}</span>
                      <span style={{color:'#f05123'}}>{timeAgo(report.createdAt)}</span></div>
                    <div className="report-seen">
                      {report.status === 'pending' && <span className="span-seen"></span>}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          }
        </ul>
      </div>
    </div>
  );
};

export default NavbarAdmin;
