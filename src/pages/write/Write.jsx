import { useContext, useState } from "react";
import "./write.scss";
import axios from "axios";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SERVER_URL } from "../../config/config";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [err, setErr] = useState("");
  const [hover, setHover] = useState(false);
  const { user } = useContext(Context);
  const history = useHistory();

  const handleCategoryKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const newCategory = e.target.value.trim();
      if (newCategory && !categories.includes(newCategory) && categories.length < 5) {
        setCategories([...categories, newCategory]);
        e.target.value = "";
        setErr('')
      }
      else
        setErr('Bạn đã thêm thẻ này')
    }
  };
  const handleCategoryDelete = (categoryToDelete) => {
    setErr('')
    setCategories(categories.filter((category) => category !== categoryToDelete));
  };
  const handleChange = (value) => {
    setDesc(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && desc && categories.length > 0) {
      const newPost = {
        profilePic: user.profilePic,
        username: user.username,
        title,
        desc,
        categories,
      };
      console.log(newPost);
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          await axios.post(SERVER_URL + "/upload", data);
        } catch (err) {setErr('file bị lỗi') }
      }
      try {
        const res = await axios.post(SERVER_URL + "/posts", newPost);
        history.push("/post/" + res.data.id);
      } catch (err) {setErr('Tiêu đề này đã tồn tại') }
    }
  };
  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="write-header">
          <label htmlFor="fileInput" className={`writeImageSelector label-img ${file ? "with-file" : ""}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <div className="write-img">
              <p>Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.</p>
              <span>Bấm để chọn ảnh</span>
              {file && (
                <img
                  className="writeImg"
                  src={URL.createObjectURL(file)}
                  alt="preview"
                />
              )}
            </div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <div className="write-title-tags">
            <input
              type="text"
              placeholder="Tiêu đề"
              className="writeInput write-title"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="writeCategoriesList">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="btnCategory"
                  onClick={() => handleCategoryDelete(category)}
                >
                  {category}
                  <span><i className="fas fa-times"></i></span>
                </button>
              ))}
            </div>
            {categories.length < 5 ? (<input
              type='text'
              placeholder="Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì (Enter để thêm)."
              className="writeInput writeCategories"
              onKeyDown={handleCategoryKeyDown}
              onChange={(e) => setErr('')}
            />) : (<></>)}
            <div className="err">{err && <span>{err}</span>}</div>

            <p style={{ marginBottom: 0 }}><strong>Lưu ý:</strong> Muốn xuất bản. Bài viết phải có tiêu đề, nội dung và có ít nhất 1 thẻ để bài viết hoàn hảo và hấp dẫn độc giả.</p>
          </div>
        </div>
        <div className="write-desc">
          <ReactQuill
            placeholder="Nội dung của bài viết..."
            className="writeInput writeText"
            value={desc}
            onChange={handleChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6] }],
                ["bold", "italic", "underline", "strike", { 'color': [] }, { 'background': [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                // ["image"],
                ["link"],
                ["clean"],
              ], clipboard: {
                matchVisual: false,
              },
            }}
            formats={["header", "bold", "italic", "color", "background", "underline", "strike", "list", "bullet", "blockquote", "code-block", "link", "clean"]}
          />
        </div>
        {(!title || !desc || categories.length === 0) ? (<button className="writeSubmit" type="submit" style={{ backgroundColor: "#f051234d", cursor: "auto" }} disabled>
          Xuất bản
        </button>) : (<button className="writeSubmit" type="submit">
          Xuất bản
        </button>)}
      </form>
    </div>
  );
}
