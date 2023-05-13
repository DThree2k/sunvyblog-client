import { useContext, useState, useEffect } from "react";
import "./updatePost.scss";
import axios from "axios";
import { Context } from "../../context/Context";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SERVER_URL, PF } from "../../config/config";

export default function UpdatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const [err, setErr] = useState("");
  const { user } = useContext(Context);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(SERVER_URL + "/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategories(res.data.categories);
    };
    getPost();
  }, [path]);
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
        username: user.username,
        title,
        desc,
        categories,
      };
      try {
        await axios.put(`${SERVER_URL}/posts/${post.id}`, {
          username: user.username,
          title,
          desc,
          categories,
        });
        history.push("/post/" + post.id);
      } catch (err) { setErr('Tiêu đề này đã tồn tại') }
    }
  };
  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="write-header">
          <div className="write-img">
            {post.photo && (
              <img
                className="writeImgUpdate"
                src={PF + post.photo}
                alt="preview"
              />
            )}
          </div>
          <div className="write-title-tags">
            <input
              type="text"
              placeholder="Tiêu đề"
              className="writeInput write-title"
              value={title}
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="writeCategoriesList">
              {categories && categories.map((category, index) => (
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
        {/* {(!title || !desc || categories.length === 0 || (title === post.title || desc === post.desc || categories === post.categories)) ? (<button className="writeSubmit" type="submit" style={{ backgroundColor: "#f051234d", cursor: "auto" }} disabled>
          Lưu và xuất bản
        </button>) : (<button className="writeSubmit" type="submit">
          Lưu và xuất bản
        </button>)} */}
        {(title && desc && categories.length > 0 && (title !== post.title || desc !== post.desc || categories !== post.categories )) ?(<button className="writeSubmit" type="submit">
          Lưu và xuất bản
        </button>) : (<button className="writeSubmit" type="submit" style={{ backgroundColor: "#f051234d", cursor: "auto" }} disabled>
          Lưu và xuất bản
        </button>) }
      </form>
    </div>
  );
}
