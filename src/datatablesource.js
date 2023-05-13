
import { PF } from "./config/config";
import { format } from 'date-fns';
export const userColumns = [
  // { field: "id", headerName: "ID", width: 150 },
  // {
  //   field: "index",
  //   headerName: "#",
  //   width: 50,
  //   renderHeader: () => {
  //     return <div className="headerCell">#</div>;
  //   },
  //   renderCell: (params) => {
  //     if (isNaN(params.row.index)) {
  //       return null;
  //     }
  //     return <div className="cell">{params.row.index + 1}</div>;
  //   }, 
  // },
  {
    field: "user",
    headerName: "",
    width: 0,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.profilePic !== '' ? PF + params.row.profilePic : "/avatar_default.png"} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Tên Người Dùng",
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 250,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status ? "Đang hoạt động" : "Đang bị khoá"}
        </div>
      );
    },
  },
  {
    field: "postCount",
    headerName: "Số Bài Viết Đã Đăng",
    width: 250,
  },
];
export const postColumns = [
  // { field: "id", headerName: "ID", width: 200 },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 350,
  },
  {
    field: "username",
    headerName: "Tác giả",
    width: 150,
  },
  {
    field: "categories",
    headerName: "Thể loại",
    width: 250,
    renderCell: (params) => {
      const categories = params.row.categories || []; // set categories to an empty array if it's undefined or null
      return (
        <span className="hidden">{categories.join(", ")}</span>
      );
    },
  },
  
  {
    field: "createdAt",
    headerName: "Ngày đăng",
    width: 120,
    renderCell: (params) => {
      return (
        <span>{format(new Date(params.row.createdAt), 'dd/MM/yyyy')}</span>
      );
    },
  },
  {
    field: "views",
    headerName: "Lượt xem",
    width: 90,
  },
  {
    field: "comments",
    headerName: "Bình luận",
    width: 90,
    renderCell: (params) => {
      return (
        <span>{params.row.comments?.length}</span>
      );
    },
  },
  // {
  //   field: "bookmarks",
  //   headerName: "Bookmarks",
  //   width: 100,
  //   renderCell: (params) => {
  //     return (
  //       <span>{params.row.bookmarks?.length}</span>
  //     );
  //   },
  // },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status ? "Hiện" : "Ẩn"}
        </div>
      );
    },
  },
];
export const postsByTagColumns = [
  // { field: "id", headerName: "ID", width: 200 },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 500,
  },
  {
    field: "username",
    headerName: "Tác giả",
    width: 150,
  },
  // {
  //   field: "categories",
  //   headerName: "Thể loại",
  //   width: 250,
  //   renderCell: (params) => {
  //     return (
  //       <span className="hidden">{(params.row.categories.join(", "))}</span>
  //     );
  //   },
  // },
  {
    field: "createdAt",
    headerName: "Ngày đăng",
    width: 120,
    renderCell: (params) => {
      return (
        <span>{format(new Date(params.row.createdAt), 'dd/MM/yyyy')}</span>
      );
    },
  },
  {
    field: "views",
    headerName: "Lượt xem",
    width: 90,
  },
  {
    field: "comments",
    headerName: "Bình luận",
    width: 90,
    renderCell: (params) => {
      return (
        <span>{params.row.comments?.length}</span>
      );
    },
  },
  {
    field: "bookmarks",
    headerName: "Bookmarks",
    width: 100,
    renderCell: (params) => {
      return (
        <span>{params.row.bookmarks?.length}</span>
      );
    },
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status ? "Hiện" : "Ẩn"}
        </div>
      );
    },
  },
];
export const tagColumns = [
  { field: "id", headerName: "Thể loại", width: 300 },
  {
    field: "totalPosts",
    headerName: "Số bài viết",
    width: 200,
  },
  {
    field: "totalViews",
    headerName: "Lượt xem",
    width: 200,
  },
  {
    field: "totalComments",
    headerName: "Bình luận",
    width: 200,
  },
  {
    field: "totalBookmarks",
    headerName: "Bookmarks",
    width: 200,
  },
];
export const reportColumns = [
  {
    field: "profilePic",
    headerName: "",
    width: 0,
    renderCell: (params) => {
      return (
        
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.user[0].profilePic !== '' ? PF + params.row.user[0].profilePic : "/avatar_default.png"} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Người gửi",
    width: 150,
    renderCell: (params) => {
      return (
        <span className="hidden">{(params.row.user[0].username)}</span>
      );
    },
  },
  {
    field: "title",
    headerName: "Bài viết",
    width: 350,
    renderCell: (params) => {
      return (
        <span className="hidden">{(params.row.post[0].title)}</span>
      );
    },
  },
  {
    field: "reason",
    headerName: "Lý do",
    width: 350,
  },
  {
    field: "createdAt",
    headerName: "Ngày gửi",
    width: 100,
    renderCell: (params) => {
      return (
        <span>{format(new Date(params.row.createdAt), 'dd/MM/yyyy')}</span>
      );
    },
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status === 'pending' ? "Chờ xử lý" : params.row.status === 'approved' ? "Đã xác nhận" : "Đã huỷ"}
        </div>
      );
    },
  },
];
