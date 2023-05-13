import axios from "axios";
import { useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { SERVER_URL } from "../../config/config";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch } = useContext(Context);
  const [error, setError] = useState('');
  const history = useHistory()
  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(SERVER_URL + "/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      history.push("/");
      if (res.data.isAdmin) {
        history.push("/admin");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Email này chưa được đăng ký');
      } else if (err.response && err.response.status === 402) {
        setError('Sai mật khẩu');
      } else if (err.response && err.response.status === 403) {
        setError('Tài khoản đã bị khoá')
      }  else {
        setError('Tài khoản này chưa được xác thực');
      }
      dispatch({ type: "LOGIN_FAILURE" });
    }}
  return (
    <div className="login">
      <Form onSubmit={handleSubmit} className="form">
        <div className="mb-6 text-center">
          <Link to="/"><img src="./sunvy_trang.png" alt="Sunvy" className="logo" /></Link>
        </div>
        <h4 className="title">Đăng nhập vào Sunvy</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Địa chỉ email</Form.Label>
          <Form.Control type="text" placeholder="Nhập địa chỉ email" onChange={() => setError("")} ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Nhập mật khẩu" onChange={() => setError("")} ref={passwordRef} />
        </Form.Group>
        {error && <span style={{ color: "red", marginTop: "10px" }}>{error}</span>}
        <div className="d-grid">
          <Button variant="primary" size="l" type="submit" >
            Đăng nhập
          </Button>
          <Link className="link" to="/register">
            Tạo tài khoản
          </Link>
        </div>
      </Form>
    </div>
  );
}
