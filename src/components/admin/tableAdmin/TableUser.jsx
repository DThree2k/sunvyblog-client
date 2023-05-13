import "./tableAdmin.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../../../config/config"; 
import axios from "axios";
import { format } from 'date-fns';

const ListPostUser = ({username}) => {
  const [postsUser, setPostsUser] = useState([]);
  useEffect(() => {
    const getUserPosts = async () => {
      const r = await axios.get(SERVER_URL + "/posts/newest/" + username);
    //   if (r.data.length === 0) {
    //     setPostsUser([{ id: "none", title: "Không có bài viết nào của " + username }]);
    //   } else {
    //     setPostsUser(r.data);
    //   }
      setPostsUser(r.data);
    };
    getUserPosts()
  }, [username]);
  return (
    <>
    {postsUser.length === 0 ? <div>{`Không có bài viết nào của ${username}`}</div> : <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">Tiêu Đề</TableCell>
          <TableCell className="tableCell">Thể Loại</TableCell>
          <TableCell className="tableCell">Ngày Đăng</TableCell>
          <TableCell className="tableCell">Lượt Xem</TableCell>
          <TableCell className="tableCell">Bình Luận</TableCell>
          <TableCell className="tableCell">Bookmarks</TableCell>
          <TableCell className="tableCell">Trạng Thái</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {postsUser.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="tableCell">{row.title}</TableCell>
            <TableCell className="tableCell">{row.categories.join(", ")}</TableCell>
            <TableCell className="tableCell">
            {format(new Date(row.createdAt), 'dd/MM/yyyy')}
              </TableCell>
            <TableCell className="tableCell">{row.views}</TableCell>
            <TableCell className="tableCell">{row.comments?.length}</TableCell>
            <TableCell className="tableCell">{row.bookmarks?.length}</TableCell>
            <TableCell className="tableCell">
              <span className={`status ${row.status}`}>{row.status ? "Hiện" : "Ẩn"}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>}
  </>
  );
};

export default ListPostUser;
