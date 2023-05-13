import "./list.scss"
import SidebarAdmin from "../../components/admin/sidebarAdmin/SidebarAdmin"
import NavbarAdmin from "../../components/admin/navbarAdmin/NavbarAdmin"
import {DatatablePosts} from "../../components/admin/datatable/Datatable"

const ListPost = () => {
  return (
    <div className="list">
      <SidebarAdmin/>
      <div className="listContainer">
        <NavbarAdmin/>
        <DatatablePosts/>
      </div>
    </div>
  )
}

export default ListPost