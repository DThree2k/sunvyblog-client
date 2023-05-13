import './index.scss'

import Footer from "../footer/Footer";
import TopBar from "../topbar/TopBar";

function DefaultLayout( {children}) {
    return ( 
        <>      
            <TopBar />
            <div className="container">
                {children}
            </div>
            <Footer />      
        </>
     );
}

export default (DefaultLayout);