import NavbarAdmin from "../../components/admin/navbarAdmin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/sidebarAdmin/SidebarAdmin";
import WidgetAdmin from "../../components/admin/widgetAdmin/WidgetAdmin";
import TableAdmin from "../../components/admin/tableAdmin/TableAdmin";
import TableHotAdmin from "../../components/admin/tableAdmin/TableHotAdmin";
import './admin.scss'
import ChartAdmin from "../../components/admin/chartAdmin/ChartAdmin";
function Admin() {
    return (
      <div className="homeAdmin">
      <SidebarAdmin />
      <div className="homeAdminContainer">
        <NavbarAdmin />
        <div className="widgets">
          <WidgetAdmin type="user" />
          <WidgetAdmin type="post" />
          <WidgetAdmin type="tag" />
          <WidgetAdmin type="view" />
        </div>
        <div className="charts">
          <ChartAdmin title=" Bài Viết 6 Tháng Qua" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Top 10 Bài Viết Mới Nhất</div>
          <TableAdmin />
        </div>
        <div className="listContainer">
          <div className="listTitle">Top 10 Bài Viết Nổi Bật Nhất</div>
          <TableHotAdmin />
        </div>
      </div>
      
    </div>
      );
}

export default Admin;