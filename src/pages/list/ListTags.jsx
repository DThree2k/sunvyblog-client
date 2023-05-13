import "./list.scss"
import SidebarAdmin from "../../components/admin/sidebarAdmin/SidebarAdmin"
import NavbarAdmin from "../../components/admin/navbarAdmin/NavbarAdmin"
import {DatatableTags} from "../../components/admin/datatable/Datatable"

const ListTags = () => {
  return (
    <div className="list">
      <SidebarAdmin/>
      <div className="listContainer">
        <NavbarAdmin/>
        <DatatableTags/>
      </div>
    </div>
  )
}

export default ListTags