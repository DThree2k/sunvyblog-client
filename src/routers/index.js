import Home from "../pages/home/Home"
import Single from "../pages/single/Single";
import Write from "../pages/write/Write";
import Settings from "../pages/settings/Settings";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Admin from "../pages/admin/Admin";
import Profile from "../pages/profile/Profile";
import UpdatePost from "../pages/updatePost/UpdatePost";
import EmailVerification from "../pages/emailVerification/EmailVerification";
import List from "../pages/list/List";
import SingleAdmin from "../pages/singleAdmin/SingleAdmin";
import ListPost from "../pages/list/ListPost";
import ListTags from "../pages/list/ListTags";
import SinglePostAdmin from "../pages/singlePostAdmin/SinglePostAdmin";
import ListPostByTag from "../pages/list/ListPostByTag";
import ListReports from "../pages/list/ListReport";

const homeRouter = {path: "/", component: Home}
const adminRouter = {path: "/admin", component: Admin}

const publicRouters = [
    {path: "/register", component: Register, layout : null},
    {path: "/login", component: Login, layout : null},
    {path: '/post/:postId', component: Single, isScrollButton: true},
    {path: "/authenticate", component: EmailVerification, layout : null},
]
const privateRouters = [
    {path: '/register', component: Home},
    {path: '/login', component: Home},
    {path: '/write', component: Write},
    {path: '/settings', component: Settings},
    {path: '/profile', component: Profile},
    {path: '/post/:postId/update', component: UpdatePost},
    {path: '/post/:postId', component: Single},
]
const privateAdminRouters = [
    {path: '/write', component: Write},
    {path: '/profile', component: Profile},
    {path: '/post/:postId/update', component: UpdatePost},
    {path: '/post/:postId', component: Single},
    {path: "/admin/users/:userId", component: SingleAdmin, layout : null},
    {path: "/admin/posts/:postId", component: SinglePostAdmin, layout : null},
    {path: "/admin/tags/:tag", component: ListPostByTag, layout : null},
    {path: "/admin/users", component: List, layout : null},
    {path: "/admin/posts", component: ListPost, layout : null},
    {path: "/admin/tags", component: ListTags, layout : null},
    {path: "/admin/reports", component: ListReports, layout : null},
]

export{publicRouters, privateRouters, homeRouter, adminRouter, privateAdminRouters}