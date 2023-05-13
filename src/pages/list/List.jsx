import "./list.scss"
import SidebarAdmin from "../../components/admin/sidebarAdmin/SidebarAdmin"
import NavbarAdmin from "../../components/admin/navbarAdmin/NavbarAdmin"
import {Datatable} from "../../components/admin/datatable/Datatable"

const List = () => {
  return (
    <div className="list">
      <SidebarAdmin/>
      <div className="listContainer">
        <NavbarAdmin/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List