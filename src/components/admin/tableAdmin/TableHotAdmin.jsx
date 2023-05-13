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

const ListHot = () => {
  const [postshot, setPostsHot] = useState([]);
  useEffect(() => {
    const getHotPosts = async () => {
      const r = await axios.get(SERVER_URL + "/posts/hottest");
      setPostsHot(r.data);
    };
    getHotPosts()
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tiêu Đề</TableCell>
            <TableCell className="tableCell">Tác Giả</TableCell>
            <TableCell className="tableCell">Thể Loại</TableCell>
            <TableCell className="tableCell">Ngày Đăng</TableCell>
            <TableCell className="tableCell">Lượt Xem</TableCell>
            <TableCell className="tableCell">Bình Luận</TableCell>
            <TableCell className="tableCell">Bookmarks</TableCell>
            <TableCell className="tableCell">Trạng Thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postshot.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.title}</TableCell>
              <TableCell className="tableCell">{row.username}</TableCell>
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
    </TableContainer>
  );
};

export default ListHot;
