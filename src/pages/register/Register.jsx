import axios from "axios";
import { useState } from "react";
import "./register.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { SERVER_URL } from "../../config/config";

const schema = yup.object().shape({
  username: yup.string()
    .min(5, 'Tên của bạn từ 5 ký tự trở lên!')
    .max(25, 'Tên của bạn phải dưới 25 ký tự!')
    .required('Tên của bạn không được rõng!'),
  email: yup.string()
    .email('Email không đúng!')
    .required('Email của bạn không được rõng!'),
  password: yup.string()
    .min(6, 'Mật khẩu phải 6 ký tự trở lên')
    .required('Mật khẩu của bạn không được rõng!'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không đúng')
    .required('Nhập lại mật khẩu không được rõng!'),
});


export default function Register() {
  const [error, setError] = useState('');
  const history = useHistory()
  const handleSubmit = async (values) => {
    setError('');
    try {
      const res = await axios.post(SERVER_URL + "/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      if (res.data) {
        localStorage.setItem("email", values.email);
        history.push("/authenticate");
      }
    } catch (err) {
      setError('Địa chỉ email đã tồn tại!');
    }
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        username: '',
        email: '',
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
        <div className="register">

          <Form className="form" noValidate onSubmit={handleSubmit}>
            <div className="mb-6 text-center">
              <Link to="/"><img src="./sunvy_trang.png" alt="Sunvy" className="logo" /></Link>
            </div>
            <h4 className="titlet">Đăng ký tài khoản cho Sunvy</h4>
            <Form.Group className="mb-3" controlId="validationFormik01">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên đăng nhập" name="username" value={values.username} onChange={handleChange} isInvalid={!!errors.username} />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationFormik02">
              <Form.Label>Địa chỉ email</Form.Label>
              <Form.Control type="email" placeholder="Nhập địa chỉ email" name="email" value={values.email} onChange={handleChange} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">
                {errors.email}

              </Form.Control.Feedback>
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
                Đăng ký
              </Button>
              <Link className="link" to="/login">
                Đã có tài khoản
              </Link>
            </div>
          </Form>
        </div>
      )}
    </Formik>

  );
};


