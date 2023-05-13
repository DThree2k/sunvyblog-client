import React from "react";
import "./footer.scss";
import { FaFacebook, FaGithubSquare, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-dark text-light">
            <div className="container">
                <div className="footer-container">
                    <div className="item-footer">
                        <img src="/sunvy_den.png" alt="TechBlog" className="logo" />
                        <p>Sunvy là một blog  cung cấp các bài viết về các chủ đề như lập trình, thiết kế web, phát triển phần mềm, bảo mật mạng và các công nghệ mới nhất trong lĩnh vực công nghệ thông tin. Bên cạnh đó, bạn có thể chia sẻ những thông tin về các sự kiện, hội thảo và chương trình đào tạo liên quan đến công nghệ thông tin..</p>
                    </div>
                    <div className="item-footer">
                        <h5>Kết nối với chúng tôi</h5>
                        <ul className="list-unstyled social-icons ">
                            <li>
                                <a href="https://www.facebook.com/dthree2882000" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                            </li>
                            <li>
                                <a href="https://github.com/DThree2k" target="_blank" rel="noopener noreferrer"><FaGithubSquare /></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/dthree2882000" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                            </li>
                        </ul>
                    </div>
                    <div className="item-footer">
                        <h5>Về chúng tôi</h5>
                        <ul className="list-unstyled">
                            <li>Email: ducdat281101@gmail.com</li>
                            <li>Điện thoại: +84 332318056</li>
                            <li>Địa chỉ: 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh</li>
                        </ul>
                    </div>


                </div>
                <div className="bot-footer">
                    <p>&copy; {new Date().getFullYear()} Sunvy - Blog công nghệ thông tin</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;