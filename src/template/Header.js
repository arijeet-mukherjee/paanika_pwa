import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import Image from "./logo.png";
import cartLogo from "./cart.png"
import profileLogo from "./profile.png"
import homeLogo from "./home.png";
import humbergerLogo from "./humberger.svg";
import { removeCurrentUser } from "../redux/user/user.actions";
import { connect , useSelector} from "react-redux";
import React, { Component } from 'react';
import s from "./header.css";
import searchImage from "./search.png";
import Util from "../util/util";
function Header(props) {

  const [openedDrawer, setOpenedDrawer] = useState(false)
  const state = useSelector((state) => state);
  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false)
    }
  }

  function Logout(){
    let header = Util.header;
    header['Authorization'] = `Bearer ${state.user.currentUser.token}`;

    Util.apiCall('POST', Util.baseUrl ,`customer_logout`, header)
      .then((dt)=>{
        console.log(dt,"sucess wala");
         props.removeCurrentUser(null);
      })
      .catch((e)=>{
        //console.log('this error')
        console.log(e)
      });
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white padHeader">
       
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" onClick={changeNav}>
              <img height="46px" width="160px" src={Image} alt="Paanika"/>
            </Link>

            <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
              <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                  
                </li>
              </ul>
              <div className="headerSearch btn" id="search">
                <form className="searchInput">
                  <input type="text" placeholder="Search here" className="inputHeader"/>
                  <a href="javascript:void(0);" class="search-button">
                    <div class="searchIcon">
                    <FontAwesomeIcon icon={["fa", "search"]} size="0.5x"/>
                    </div>
                  </a>
                </form>
              </div>
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item" style={{borderRadius : '0.25rem', 'border':'1px solid #DFABE2'}} >
                    <Link to="/checkout" className="nav-link">
                        <img alt="Paanika" src={cartLogo} height="25px" width="25.71px"></img>
                        <span className="ms-3 badge rounded-pill" style={{background : ' #DFABE2'}}>{state.cart.cartItems.length}</span>
                    </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    href="!#"
                    className="nav-link"
                    data-toggle="dropdown"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{'border-color' : ' #DFABE2'}}
                  >
                    <img alt="Paanika" src={profileLogo} height="25px" width="25.71px"></img>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                    style={{background : ' #DFABE2',color:'#fff'}}
                  > {
                    !state.user.currentUser?
                    <>
                    <li>
                      <Link to="/signin" className="dropdown-item" onClick={changeNav}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/signin" className="dropdown-item" onClick={changeNav}>
                        Sign Up
                      </Link>
                    </li>   
                    </>
                    :
                    <>
                    <li>
                      <span className="dropdown-item">
                        {state.user.currentUser.email}
                      </span>
                      <span className="dropdown-item">
                        {state.user.currentUser.fullname}
                      </span>
                      <span className="dropdown-item" onClick={()=>{ Logout()}}>
                        { "-> LOGOUT" }
                      </span>
                    </li>
                    </>
                    }
                                    
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    href="!#"
                    className="nav-link"
                    role="button"
                    aria-expanded="false"
                  >
                  <img alt="Paanika" src={homeLogo} height="25px" width="25.71px"></img>
                  </a>
                </li>
              </ul>
            </div>

            <div className="d-inline-block d-lg-none">
              <div className="headerSearch btn">
                      for mobile
              </div>
              <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
                <img alt="Paanika" src={humbergerLogo} height="33px" width="33.71px"></img>
              </button>
            </div>
          </div>
        
      </nav>
    </header>
  );
}

const mapDispatchToProps = (dispatch) => ({
  removeCurrentUser : (item) => dispatch(removeCurrentUser(item))
});

export default connect(null,mapDispatchToProps)(Header);
