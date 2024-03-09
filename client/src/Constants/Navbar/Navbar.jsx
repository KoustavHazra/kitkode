import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from "../../store/auth";

const Navbar = () => {
  const { isLoggedIn, user, isLoading, isAdmin } = useAuth();
  console.log("isLoggedIn from navbar: ", isLoggedIn);
  console.log("isAdmin value in Navbar:", user.isAdmin);
  // isAdmin = true;
  
  

  return (
    <div id='navbar-main' className='flex-row'>
      <Link to={'/'}>
        <div className="logo-box flex-row"> 
          <img className='logo' src="../../../logo_2.png" alt="logo" /> 
          <p>KitKode</p>
        </div>
      </Link>
      <div className="nav-options">
        <Link to={'/problemset/all/'} >Problems</Link>
      </div>
      <div className="nav-options">
        <Link to={'/'} >Blogs</Link>
      </div>
      <div className="nav-options">
        <Link to={'/contact'} >Contact us</Link>
      </div>
      <>
      {isLoggedIn 
        ? (
          <>
            {user.isAdmin && (
              <div className="nav-options">
                <Link to={'/admin/users'}>Admin</Link>
              </div>
            )}
            <div className="nav-options">
              <Link to={'/logout'}>Logout</Link>
            </div>
          </>
          )
        : (
          <>
            <div className="nav-options">
              <Link to={'/signup'}>Register</Link>
            </div>
            <div className="nav-options">
              <Link to={'/login'}>Login</Link>
            </div>
          </>
          )
      }
      </>
      
      
    </div>
  )
}

export default Navbar;