import "./list.scss"
import SidebarAdmin from "../../components/admin/sidebarAdmin/SidebarAdmin"
import NavbarAdmin from "../../components/admin/navbarAdmin/NavbarAdmin"
import {DatatableReports} from "../../components/admin/datatable/Datatable"
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config/config";
const ListReport = () => {
  const [dataReport, setDataReport] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get(SERVER_URL + "/reports");
      setDataReport(res.data);
    };
    fetchReports();
  }, []);
  return (
    <div className="list">
      <SidebarAdmin/>
      <div className="listContainer">
      <NavbarAdmin dataReport={dataReport} />
        <DatatableReports setDataReport={setDataReport} dataReport={dataReport}/>
      </div>
    </div>
  )
}

export default ListReport