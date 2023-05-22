import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext, useLayoutEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "./context/Context";
import './index.scss'
import "./style/dark.scss";
import { publicRouters, privateRouters, homeRouter, adminRouter, privateAdminRouters } from './routers'
import { DefaultLayout } from "./components/Layout";
import Error from "./pages/error/Error";
import ScrollButton from './components/Layout/scrollButton/ScrollButton ';
function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  const { user } = useContext(Context);
  const HomePage = homeRouter.component
  const AdminPage = adminRouter.component
  const isAdmin = user && user.isAdmin ? user.isAdmin : false;

  return (
    <>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path={homeRouter.path}><ScrollButton /><DefaultLayout><HomePage /></DefaultLayout></Route>
          { isAdmin && <Route exact path={adminRouter.path}><AdminPage /></Route>}
          {!user ?
            (publicRouters.map((route, index) => {
              const PublicLayout = route.layout === null ? Fragment : DefaultLayout
              const PublicPage = route.component
              return <Route key={index} path={route.path}>{route.isScrollButton && <ScrollButton />}
                <PublicLayout><PublicPage /></PublicLayout></Route>
            })) : (user.isAdmin ? (privateAdminRouters.map((route, index) => {
              const PrivateAdminLayout = route.layout === null ? Fragment : DefaultLayout
              const PrivateAdminPage = route.component
              return <Route key={index} path={route.path}><PrivateAdminLayout><PrivateAdminPage /></PrivateAdminLayout></Route>
            })) : (privateRouters.map((route, index) => {
              const PrivatePage = route.component
              return <Route key={index} path={route.path}><ScrollButton /><DefaultLayout><PrivatePage /></DefaultLayout></Route>
            })))
          }
          
          {/* {user.isAdmin && (privateAdminRouters.map((route, index) => {
            const PrivateAdminPage = route.component
            return <Route key={index} path={route.path}><PrivateAdminPage /></Route>
          }))} */}
          <Route path='*'><Error /></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
