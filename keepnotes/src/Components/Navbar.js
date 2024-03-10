import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();
  const navigate=useNavigate();
  const Logout=()=>{
    localStorage.removeItem('token');
    navigate('/Login');
  }
  return (
    <div>
    <nav>
        <div className="navbar" id="navbar">
            <div className="navitems1">
                <Link id="navit" to="/" className={`nav1item logo ${props.Mode==='dark'?"dark":""}`}>Keep-Notes</Link>
                <Link id="navit" to="/" className={`nav1item navhome ${location.pathname==='/'?"active":""}  ${props.Mode==='dark'?"dark":""}`} ><img alt="homeicom" src={`${props.Mode==='dark'?"Icons/White_home.png":"Icons/home.png"}`} width="20px"/></Link>
                <Link id="navit" to="/createnote" className={`nav1item navcreate ${location.pathname==='/createnote'?"active":""} ${props.Mode==='dark'?"dark":""}`}><img alt="writeicon" src={`${props.Mode==='dark'?"Icons/White_write.png":"Icons/write.png"}`} width="20px"/></Link>
                <Link id="navit" to="/about" className={`nav1item navabout ${location.pathname==='/about'?"active":""}  ${props.Mode==='dark'?"dark":""}`}><img alt="abouticon" src={`${props.Mode==='dark'?"Icons/White_About.png":"Icons/About.png"}`} width="20px"/></Link>
            </div>
            {/* <div className="navitem2">
                  <input className="form-check-input" onClick={props.ToggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                  <label className={`form-check-label text-${props.mode==='light'?'dark':'light'} `} htmlFor="flexSwitchCheckDefault">Enable Blue Mode</label>
                </div> */}
              <div className="navitems2">
              <img className="darklight" title={`${props.Mode==='dark'?"Turn on light mode":"Turn on dark mode"}`} onClick={props.togglemode} alt="mode" src={`${props.Mode==='dark'?"Icons/sun.png":"Icons/night-mode.png"}`} width="30px"/>

            {localStorage.getItem('token')?
            <>
              <Link className={`nav2item ${props.Mode==='dark'?'btngreen':''}`} to='/Profile' role="button">Profile</Link>
              <Link className={`nav2item ${props.Mode==='dark'?'btngreen':''}`} onClick={Logout}>Log out</Link>
              </>
            :
            <>
            <Link className={`nav2item ${props.Mode==='dark'?'btngreen':''}`} to="/Login" role="button">Login</Link>
            <Link className={`nav2item ${props.Mode==='dark'?'btngreen':''}`} to="/Signup" role="button">Sign Up</Link>
            </>
            }
            </div>

        </div>
        </nav>
    </div>
    
  );
};

export default Navbar;
