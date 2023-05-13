import { Link } from "react-router-dom";
import "./error.scss"
function Error() {

    return (
        <>
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>Oops!</h1>
                    </div>
                    <h2>404 - Không tìm thấy trang</h2>
                    <p>Trang bạn đang tìm kiếm có thể đã bị xóa do đổi tên hoặc tạm thời không có.</p>
                    <div className="link-error"><Link to="/" className="link">Chuyển đến Trang chủ</Link></div>
                    

                </div>
            </div>
        </>
    );
}

export default Error;