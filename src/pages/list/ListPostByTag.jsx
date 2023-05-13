import "./list.scss"
import SidebarAdmin from "../../components/admin/sidebarAdmin/SidebarAdmin"
import NavbarAdmin from "../../components/admin/navbarAdmin/NavbarAdmin"
import { DatatablePostsByTag } from "../../components/admin/datatable/Datatable"
import { useLocation } from "react-router";
const ListPostByTag = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    return (
        <div className="list">
            <SidebarAdmin />
            <div className="listContainer">
                <NavbarAdmin />
                <DatatablePostsByTag tag={path} />
            </div>
        </div>
    )
}

export default ListPostByTag