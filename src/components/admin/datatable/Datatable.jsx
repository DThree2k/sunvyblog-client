import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, postColumns, tagColumns, postsByTagColumns, reportColumns } from "../../../datatablesource";
// import { userColumns } from "../../../datatablesource"; 
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../../../config/config";
import axios from "axios";
export const Datatable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(SERVER_URL + "/users");
      setData(res.data);
    };
    fetchUsers();
  }, []);
  const handleLock = async (username, status) => {
    try {
      const res = await axios.put(`${SERVER_URL}/users/lock/${username}`, { status });
      const updatedUser = res.data;
      // Tìm kiếm user tương ứng trong state và cập nhật lại trạng thái mới
      const updatedData = data.map((user) => {
        if (user.username === updatedUser.username) {
          return {
            ...updatedUser,
            postCount: user.postCount // giữ nguyên thuộc tính postCount như trước
          };
        }
        return user;
      });
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/admin/users/" + params.row.username} style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleLock(params.row.username, !params.row.status)}
            >
              {params.row.status ? "Khóa" : "Bỏ khóa"}
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách người dùng
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Số hàng trên mỗi trang:",
          }
        }}
      // checkboxSelection
      />
    </div>
  );
};
export const DatatablePosts = () => {
  const [dataPost, setDataPost] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(SERVER_URL + "/posts/adminPosts");
      setDataPost(res.data);
    };
    fetchPosts();
  }, []);
  const handleLock = async (id, status) => {
    try {
      const res = await axios.put(`${SERVER_URL}/posts/lock/${id}`, { status });
      const updatedPost = res.data;
      setDataPost((prevData) => {
        const index = prevData.findIndex((post) => post.id === updatedPost.id);
        const newData = [...prevData];
        newData[index] = updatedPost;
        return newData;
      });
    } catch (error) {
      console.log(error);
    }
  };


  const actionColumnPost = [
    {
      field: "action",
      headerName: "Hành động",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/posts/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleLock(params.row.id, !params.row.status)}
            >
              {params.row.status ? "Ẩn" : "Hiện"}
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách bài viết
      </div>
      <DataGrid
        className="datagrid"
        rows={dataPost}
        columns={postColumns.concat(actionColumnPost)}
        initialState={{
          ...dataPost.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Số hàng trên mỗi trang:",
          }
        }}
      // checkboxSelection
      />
    </div>
  );
};
export const DatatableTags = () => {
  const [dataTags, setDataTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      const res = await axios.get(SERVER_URL + "/posts/categories");
      setDataTags(res.data);
    };
    fetchTags();
  }, []);
  const actionColumnTags = [
    {
      field: "action",
      headerName: "Hành động",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/tags/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách thể loại
      </div>
      <DataGrid
        className="datagrid"
        rows={dataTags}
        columns={tagColumns.concat(actionColumnTags)}
        initialState={{
          ...dataTags.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Số hàng trên mỗi trang:",
          }
        }}
      // checkboxSelection
      />
    </div>
  );
};
export const DatatablePostsByTag = ({ tag }) => {
  const [dataPostsByTag, setDataPostsByTag] = useState([]);
  useEffect(() => {
    const fetchPostsByTag = async () => {
      const res = await axios.get(SERVER_URL + "/posts/categories/" + tag);
      setDataPostsByTag(res.data);
    };
    fetchPostsByTag();
  }, [tag]);
  const handleLock = async (id, status) => {
    try {
      const res = await axios.put(`${SERVER_URL}/posts/lock/${id}`, { status });
      const updatedPostByTag = res.data;
      setDataPostsByTag((prevData) => {
        const index = prevData.findIndex((post) => post.id === updatedPostByTag.id);
        const newData = [...prevData];
        newData[index] = updatedPostByTag;
        return newData;
      });
    } catch (error) {
      console.log(error);
    }
  };


  const actionColumnPostsByTag = [
    {
      field: "action",
      headerName: "Hành động",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/posts/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleLock(params.row.id, !params.row.status)}
            >
              {params.row.status ? "Ẩn" : "Hiện"}
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách bài viết thể loại {tag}
      </div>
      <DataGrid
        className="datagrid"
        rows={dataPostsByTag}
        columns={postsByTagColumns.concat(actionColumnPostsByTag)}
        initialState={{
          ...dataPostsByTag.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Số hàng trên mỗi trang:",
          }
        }}
      // checkboxSelection
      />
    </div>
  );
};
export const DatatableReports = ({ setDataReport , dataReport}) => {
  // const [dataReport, setDataReport] = useState([]);
  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get(SERVER_URL + "/reports");
      setDataReport(res.data);
    };
    fetchReports();
  }, [setDataReport]);
  const handleApproved = async (id, path) => {
    try {
       await axios.put(`${SERVER_URL}/posts/lock/${path}`, { status: false });
       const res = await axios.put(`${SERVER_URL}/reports/${id}`, { status: 'approved' })
      const updatedReport = res.data;
      setDataReport((prevData) => {
        const index = prevData.findIndex((report) => 
        report._id === updatedReport._id
        );
        const newData = [...prevData];
        newData[index] = updatedReport;
        return newData;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRejected = async (id, path) => {
    try {
       await axios.put(`${SERVER_URL}/posts/lock/${path}`, { status: true });
       const res = await axios.put(`${SERVER_URL}/reports/${id}`, { status: 'rejected' })
      const updatedReport = res.data;
      setDataReport((prevData) => {
        const index = prevData.findIndex((report) => 
        report._id === updatedReport._id
        );
        const newData = [...prevData];
        newData[index] = updatedReport;
        return newData;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumnReport = [
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/posts/${params.row.post[0]._id}?report_id=${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link>
            {params.row.status === 'pending' ?
              <><div className="approvedButton"
                onClick={() => handleApproved(params.row._id ,params.row.post[0]._id)}
              >Xác nhận</div>
                <div
                  className="rejectedButton"
                  onClick={() => handleRejected(params.row._id ,params.row.post[0]._id)}
                >
                  Huỷ
                </div></> : params.row.status === 'approved' ?
                <div
                  className="rejectedButton"
                  onClick={() => handleRejected(params.row._id ,params.row.post[0]._id)}
                  >Huỷ</div> : <div
                  className="approvedButton"
                  onClick={() => handleApproved(params.row._id ,params.row.post[0]._id)}
                >
                  Xác nhận
                </div>
            }
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách báo cáo
      </div>
      <DataGrid
        className="datagrid"
        rows={dataReport}
        columns={reportColumns.concat(actionColumnReport)}
        initialState={{
          ...dataReport.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Số hàng trên mỗi trang:",
          }
        }}
      // checkboxSelection
      />
    </div>
  );
};
