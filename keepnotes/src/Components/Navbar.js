import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const navigate=useNavigate();
  const Logout=()=>{
    localStorage.removeItem('token');
    navigate('/Login');
  }
  // useEffect(() => {
  //    console.log(location.pathname);
  // }, [location]);
  return (
    <div>
    <nav>
        <div className="navbar">
            <div className="navitems1">
                <Link to="/" className="nav1item logo">Keep-Note</Link>
                <Link to="/" className={`nav1item navhome ${location.pathname==='/'?"active":""}`} ><img alt="homeicom" src="Icons/home.png" width="20px"/></Link>
                <Link to="/createnote" className={`nav1item navcreate ${location.pathname==='/createnote'?"active":""}`}><img alt="writeicon" src="Icons/write.png" width="20px"/></Link>
                <Link to="/about" className={`nav1item navabout ${location.pathname==='/about'?"active":""}`}><img alt="abouticon" src="Icons/About.png" width="20px"/></Link>
            </div>
            {localStorage.getItem('token')?
              <div className="navitems2">
              <Link className="nav2item" to='/Profile' role="button">Profile</Link>
              <Link className="nav2item" onClick={Logout}>Log out</Link>
              </div>
            :
            <div className="navitems2">
            <Link className="nav2item" to="/Login" role="button">Login</Link>
            <Link className="nav2item" to="/Signup" role="button">Sign Up</Link>
            </div>
            }
        </div>
        </nav>
    </div>
    // <div>
    //   <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //     <div className="container-fluid">
    //       <Link className="navbar-brand" to="/">
    //         Keepnotes
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarSupportedContent"
    //         aria-controls="navbarSupportedContent"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //           <li className="nav-item">
    //             <Link
    //               className={`nav-link ${location.pathname==='/'?"active":""}`}
    //               aria-current="page"
    //               to="/"
    //             >
    //               Home
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link
    //               className={`nav-link ${location.pathname==='/createnote'?"active":""}`}
    //               aria-current="page"
    //               to="/createnote"
    //             >
    //               CreateNote
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">
    //               About
    //             </Link>
    //           </li>
             
    //         </ul>
    //         <div className="d-flex">{localStorage.getItem('token')?
    //         <div>
    //        <Link className="btn btn-primary mx-2" to='/Profile' role="button">Profile</Link>
    //        <button className="btn btn-primary mx-2" onClick={Logout}>Logout</button>
    //        </div>:
    //        <div>
    //        <Link className="btn btn-primary mx-2" to="/Login" role="button">Login</Link>
    //        <Link className="btn btn-primary mx-2" to="/Signup" role="button">Sign up</Link>
    //        </div>
    //         }
    //        </div>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
};

export default Navbar;
