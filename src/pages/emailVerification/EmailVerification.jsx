import { useState, useEffect  } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './emailVerification.scss'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config/config";

const EmailVerification = () => {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0);
  const history = useHistory();
  const email = localStorage.getItem("email");
  const startCountdown = () => {
    setCountdown(300);
  };
  useEffect(() => {
    let timeoutId = null;
    if (countdown > 0) {
      timeoutId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [countdown]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Mã xác thực phải 6 ký tự!");
      return;
    }
    try {
      const res = await axios.post(SERVER_URL + "/auth/verify", {
        email: email,
        verificationCode: code,
      });
      history.push("/login");
    } catch (error) {
      setError("Mã xác thực không đúng");
    }
  }
  const handleResendCode = async () => {
    if (countdown > 0) {
        console.log(`Vui lòng đợi ${countdown} giây để gửi lại mã xác thực.`);
      } else {
        console.log("Đang gửi lại mã xác thực...");
        startCountdown();
        // Gửi lại mã xác thực
        try {
            await axios.post(SERVER_URL + "/auth/resend-otp", {
              email: localStorage.getItem("email"),
            });
          } catch (error) {
            setError("Lỗi khi gửi lại mã xác thực");
          }
      }
    
  };
//   const canResendCode = waitingTime === 0;
  return (
    <div className="login">
      <Form onSubmit={handleSubmit} className="form">
        <div className="mb-6 text-center">
          <Link to="/"><img src="./sunvy_trang.png" alt="Sunvy" className="logo" /></Link>
        </div>
        <h4 className="title">Xác thực tài khoản</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="lable">{`Mã xác thực đã được gửi đến ${email}.`}</Form.Label>
          <Form.Control className="code" type="text" placeholder="Nhập mã xác thực" onChange={(e) => setCode(e.target.value)} />
        </Form.Group>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <div className="d-grid" style={{marginTop:'10px'}}>
          <Button variant="primary" size="l" type="submit" >
            Xác thực
          </Button>
          <div className="d-grid" style={{marginTop:'10px'}}>
          <Button variant="outline-primary" onClick={handleResendCode} disabled={countdown > 0}>
    Gửi lại mã xác thực ({countdown > 0 ? `${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? `0${countdown % 60}` : countdown % 60}` : "5:00"})
  </Button>
      </div>
        </div>
      </Form>
    </div>
  );
}

export default EmailVerification;
