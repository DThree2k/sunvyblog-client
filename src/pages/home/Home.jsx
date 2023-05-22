import { useEffect, useState } from "react";
import PostList from "../../components/Layout/postList/PostList";
import "./home.scss";
import axios from "axios";
import { useLocation } from "react-router";
import Loading from "../../components/loading/Loading";
import { SERVER_URL } from "../../config/config";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { PF } from "../../config/config";
import DOMPurify from "dompurify";
import { Carousel } from 'react-bootstrap';
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [postshot, setPostsHot] = useState([]);
  const [postsLastest, setPostsLastest] = useState([]);
  const [postsTag, setPostsTag] = useState([]);
  const [isoutstanding, setIsoutstanding] = useState(true);
  const [isLatest, setIsLatest] = useState(true);
  const [isCarousel, setIsCarousel] = useState(true);
  const [isTag, setIsTag] = useState(false);
  const [isAllPosts, setIsAllPosts] = useState(true)
  const [tags, setTags] = useState([])
  const [activeKey, setActiveKey] = useState('1');
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const user = params.get("user");
  const cat = params.get("cat");
  const q = params.get("q");
  const decodedUser = decodeURIComponent(user);
  const decodedCategory = decodeURIComponent(cat);
  const decodedSearch = decodeURIComponent(q);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(SERVER_URL + "/posts/" + search);
      setPosts(res.data);
    };
    const fetchPostsHot = async () => {
      const r = await axios.get(SERVER_URL + "/posts/hot");
      setPostsHot(r.data);
    };
    const fetchPostsLastest = async () => {
      const lastest = await axios.get(SERVER_URL + "/posts/lastest");
      setPostsLastest(lastest.data);
    };

    fetchPosts();
    fetchPostsHot();
    fetchPostsLastest();

    window.scrollTo(0, 0);
  }, [search]);
  useEffect(() => {
    const fetchPostsTag = async () => {
      const rtags = await axios.get(SERVER_URL + "/posts/tags/" + tags);
      setPostsTag(rtags.data);
    };
    fetchPostsTag();
    window.scrollTo(0, 0);
  }, [tags]);
  const handleSelect = (eventkey) => {
    const currentNav = document.querySelector('.nav-link.active');
    currentNav && currentNav.classList.remove('active');
    setActiveKey(eventkey);
    const newNav = document.querySelector(`[eventKey="${eventkey}"]`);
    newNav && newNav.classList.add('active');
    switch (eventkey) {
      case '1':
        setIsoutstanding(true);
        setIsLatest(true)
        setIsAllPosts(true)
        setIsCarousel(true)
        setIsTag(false)
        break;
      case '2':
        setIsoutstanding(false);
        setIsLatest(true)
        setIsAllPosts(false)
        setIsCarousel(false)
        setIsTag(false)
        break;
      case '3':
        setIsoutstanding(true);
        setIsLatest(false)
        setIsAllPosts(false)
        setIsCarousel(false)
        setIsTag(false)
        break;
      case '4':
        currentNav && currentNav.classList.remove('active');
        break;
      case '4.1':
        setIsoutstanding(false);
        setIsLatest(false)
        setIsAllPosts(false)
        setIsCarousel(false)
        setTags(['Front-end'])
        setIsTag(true)
        break;
      case '4.2':
        setIsoutstanding(false);
        setIsLatest(false)
        setIsAllPosts(false)
        setIsCarousel(false)
        setTags(['Back-end'])
        setIsTag(true)
        break;
      case '4.3':
        setIsoutstanding(false);
        setIsLatest(false)
        setIsAllPosts(false)
        setIsCarousel(false)
        setTags(['UI', 'UX'])
        setIsTag(true)
        break;
      case '4.4':
        setIsoutstanding(false);
        setIsLatest(false)
        setIsAllPosts(false)
        setIsCarousel(false)
        setTags(['Others'])
        setIsTag(true)
        break;
      default:
        setIsoutstanding(false);
        setIsLatest(false)
        setIsAllPosts(true)
        setIsCarousel(false)
        setIsTag(false)
    }
  }
  const handleDropdownToggle = (isOpen) => {
    if (isOpen) {
      const dropNav = document.querySelector('.nav-link.active');
      dropNav && dropNav.classList.remove('active');
    }
  }
  if (!posts || Object.keys(posts).length === 0) {
    return (
      <Loading />
    );
  }
  if (search.slice(1, 5) === 'user') {
    return (
      <>
        <div className="DefaultLayout_container-top">
          <h1 className="DefaultLayout_heading">Các bài viết của {decodedUser}</h1>
        </div>
        <PostList posts={posts} />
      </>
    )
  }
  if (search.slice(1, 2) === 'q') {
    return (
      <>
        <div className="DefaultLayout_container-top">
          <h1 className="DefaultLayout_heading">Kết quả cho '{decodedSearch}'</h1>
        </div>
        <PostList posts={posts} />
      </>
    )
  }
  if (search.slice(1, 4) === 'cat') {
    return (
      <>
        <div className="DefaultLayout_container-top">
          <h1 className="DefaultLayout_heading">Các bài viết được gắn thẻ {decodedCategory}</h1>
        </div>
        <PostList posts={posts} />
      </>
    )
  }
  return (
    <>

      <Nav className="navbar-nav" variant="tabs" activeKey={activeKey} onSelect={handleSelect} >
          <Nav.Item>
            <Nav.Link eventKey="1" title="Trang chủ">
              TRANG CHỦ
            </Nav.Link>
          </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" title="Các bài viết mới nhất">
            MỚI NHẤT
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" title="Các bài viết nổi bật">
            NỔI BẬT
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT" id="nav-dropdown" eventKey="4" onToggle={handleDropdownToggle}>
          <NavDropdown.Item title="Các bài viết theo chủ đề Front-end" eventKey="4.1" >Front-end</NavDropdown.Item>
          <NavDropdown.Item title="Các bài viết theo chủ đề Back-end" eventKey="4.2" >Back-end</NavDropdown.Item>
          <NavDropdown.Item title="Các bài viết theo chủ đề UI/UX" eventKey="4.3" >UI/UX</NavDropdown.Item>
          <NavDropdown.Item title="Các bài viết theo chủ đề Others" eventKey="4.4" >Others</NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link eventKey="5" title="Tất cả bài viết">
            TẤT CẢ BÀI VIẾT
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {isCarousel && (
        <div className="carousel-home">
          <Carousel  >
            {postshot.slice(0, 4).map(post => (
              
              <Carousel.Item key={post.id} interval={4000}>
                <Link to={`/post/${post.id}`} className="link">
                  <div className="body-opacity">
                  
                  <Carousel.Caption>
                    <h5 className="carousel-h5">{post.title}</h5>
                    <div className="carousel-desc"><div className="show" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }} /></div>

                  </Carousel.Caption>
                  <img
                    className="d-block  custom-opacity"
                    src={PF + post.photo}
                    alt={post.profilePic}
                  />
                  </div>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}

      {isoutstanding && (
        <>
          <div className="DefaultLayout_container-top">
            <h1 className="DefaultLayout_heading">Bài viết nổi bật</h1>
          </div>
          <PostList posts={postshot} />
        </>
      )}
      {isLatest && (
        <>
          <div className="DefaultLayout_container-top">
            <h1 className="DefaultLayout_heading">Bài viết gần đây</h1>
          </div>
          <PostList posts={postsLastest} />
        </>
      )}
      {isAllPosts && (
        <>
          <div className="DefaultLayout_container-top">
            <h1 className="DefaultLayout_heading">Tất cả bài viết</h1>
          </div>
          <PostList posts={posts} />
        </>
      )}
      {isTag && (
        <>
          <div className="DefaultLayout_container-top">
            <h1 className="DefaultLayout_heading">Chủ đề {tags.includes('UI') ? 'UI/UX' : tags}</h1>
          </div>
          <PostList posts={postsTag} />
        </>
      )}

    </>
  );
}
