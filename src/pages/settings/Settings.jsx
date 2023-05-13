import "./settings.scss";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from "formik";
import * as yup from "yup";
import { SERVER_URL } from "../../config/config";
import { PF } from "../../config/config";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  // const [username, setUsername] = useState(user.username);
  // const [password, setPassword] = useState(user.password);
  const [error, setError] = useState('');
  const history = useHistory();
  const cancel = () => {
    history.goBack();
  };
  const schema = yup.object().shape({
    username: yup.string()
      .min(5, 'Tên của bạn từ 5 ký tự trở lên!')
      .max(25, 'Tên của bạn phải dưới 25 ký tự!')
      .required('Tên của bạn không được rõng!'),
    password: yup.string()
      .min(6, 'Mật khẩu phải 6 ký tự trở lên')
      .required('Mật khẩu của bạn không được rõng!'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không đúng')
      .required('Nhập lại mật khẩu không được rõng!'),
  });
  const handleSubmit = async (values) => {
    setError('');
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user.id,
      username : values.username,
    };
    if(values.password){
      updatedUser.password = values.password
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(SERVER_URL + "/upload", data);
      } catch (err) {
        setError('Không cập nhật được file');
      }
    }
    try {
      const res = await axios.put(SERVER_URL + "/users/" + user.id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      
      history.push("/");
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      setError("Lỗi! Không cập nhật được")
    }
  };
  
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Cập nhật thông tin cá nhân</span>
          <button className="settingsCancel" onClick={cancel}>Trờ về</button>
        </div>
        <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        

          <Form className="form-setting" noValidate onSubmit={handleSubmit}>
          <label>Ảnh đại diện</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : ( user.profilePic === '' ? ("/avatar_default.png") : (PF + user.profilePic))}//user.profilePic === '' ? ("/avatar_default.png") : (PF + user.profilePic) }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            </div>
            <Form.Group className="mb-3" controlId="validationFormik01">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" placeholder={user.username} name="username" value={values.username} onChange={handleChange} isInvalid={!!errors.username} />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationFormik02">
              <Form.Label>Địa chỉ email</Form.Label>
              <Form.Control type="email" placeholder={user.email} name="email" readOnly={true} style={{backgroundColor: "#f2f2f2"}}/>
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationFormik03">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" placeholder="Nhập mật khẩu" name="password" value={values.password} onChange={handleChange} isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationFormik04">
              <Form.Label>Nhập lại mật khẩu</Form.Label>
              <Form.Control type="password" placeholder="Nhập mật khẩu" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} isInvalid={!!errors.confirmPassword} />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            {error && <span style={{color:"red", marginTop:"10px"}}>{error}</span>}
            <div className="d-grid">
              <Button variant="primary" size="l" type="submit" >
                Cập nhật
              </Button>
            </div>
          </Form>
        
      )}
    </Formik>
        {/* <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Ảnh đại diện</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : ( user.profilePic === '' ? ("/avatar_default.png") : (PF + user.profilePic))}//user.profilePic === '' ? ("/avatar_default.png") : (PF + user.profilePic) }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Họ và tên</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            readOnly={true}
            style={{backgroundColor: "lightgray"}}
          />
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu nếu muốn thay đổi mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="action-setting">
          { username !== user.username|| password !== user.password  ? (<button className="settingsSubmit" type="submit">
            Cập nhật
          </button>) : (<button className="settingsSubmit" type="submit" style={{ backgroundColor: "#f051234d", cursor: "auto" }} disabled>
            Cập nhật
          </button>)}
          </div>
        </form> */}
       
      </div>
    </div>
  );
}
