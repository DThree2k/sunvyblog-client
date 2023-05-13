import "./singleAdmin.scss";
import SidebarAdmin from "../../components/admin/sidebarAdmin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/navbarAdmin/NavbarAdmin";
import Chart from "../../components/admin/chart/Chart";
import ListPostUser from "../../components/admin/tableAdmin/TableUser";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { SERVER_URL, PF } from "../../config/config";
import axios from "axios";
const SingleAdmin = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  // const [user, setUser] = useState({});
  const [email, setEmail] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [status, setStatus] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(SERVER_URL + "/users/" + path);
      // setUser(res.data);
      setEmail(res.data.email);
      setProfilePic(res.data.profilePic);
      setStatus(res.data.status);
    };
    getUser();
  }, [path]);
  return (
    <div className="singleAdmin">
      <SidebarAdmin />
      <div className="singleContainerAdmin">
        <NavbarAdmin />
        <div className="topsingleAdmin">
          <div className="leftsingleAdmin">
            <h1 className="title">Thông tin</h1>
            <div className="itemsingleAdmin">
              <img
                src={profilePic === "" ? "/avatar_default.png" : PF + profilePic}
                alt={`avatar ${path}`}
                className="itemImgsingleAdmin"
              />
              <div className="detailssingleAdmin">
                <h1 className="itemTitle">{path}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Trạng thái:</span>
                  <span className={`itemValue ${status}`}>{status ? "Đang hoạt động" : "Bị khoá"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title={`Bài Viết Của ${path} 6 Tháng Qua`} username={path} />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Các Bài Viết Gần Nhất Của {path}</h1>
          <ListPostUser username={path} />
        </div>
      </div>
    </div>
  );
};

export default SingleAdmin;
