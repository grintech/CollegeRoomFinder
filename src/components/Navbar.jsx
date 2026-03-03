import {  useState } from "react";
import {
  Menu,
  X,
  Building2,
  Home,
  LogIn,
  LogOut,
  User
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
   const navigate = useNavigate()
  const closeMenu = () => setOpen(false);
  const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL;

  const isStudent = user?.role === "student"
  const isDashboardRole = ["host", "admin"].includes(user?.role);


   const handleLogout = async () => {
    await logout()
    closeMenu();
    toast.success("Logged out successfully!")
    navigate("/", { replace: true })
  }

 
  const handleDashboardRedirect = () => {
  const token = localStorage.getItem("token")


  if(user?.role === "host"){
    window.location.replace( `${WEBSITE_URL}/host/dashboard`  )
  }
  else if(user?.role === "admin"){
    window.location.replace( `${WEBSITE_URL}/admin/dashboard`  )
  }
  else{
    navigate("/", { replace: true })
  }
}

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-xl custom-navbar">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2" >
            {/* <img src="/images/logo_new.png" alt="logo" width={200} /> */}
            <img src="/images/logo_new1.png" alt="logo" width={220}  />
          
          </Link>

          {/* Toggle */}
          <button
            className="navbar-toggler"
            onClick={() => setOpen(true)}
          >
            <Menu size={28}  />
          </button>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse d-none d-xl-flex">
            <ul className="navbar-nav ms-auto gap-4">
              <li> <Link to="/hosts" > For Hosts </Link></li>
              <li><Link to="#rent">For Rent</Link></li>
              <li><Link to="/?scroll=about" > About </Link></li>
            </ul>

           {/*  If NOT Logged In */}
            {!isAuthenticated  && (
              <Link to="/login">
                <button className="blue_btn ms-4 d-flex align-items-center gap-1">
                  Login
                  <LogIn size={16} />
                </button>
              </Link>
            )}

           {/*  If Logged In */}
            {isAuthenticated && isStudent && (
              <div className="dropdown ms-4">
                <button
                  className=" theme_outline_btn dropdown-toggle "
                  data-bs-toggle="dropdown"
                >
                   {user?.name?.split(" ")[0] || "User"}
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/my-account">
                     <User size={16} /> My Account
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                     <LogOut size={16}/> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Host/Admin Dashboard Button */}
            {isAuthenticated && isDashboardRole && (
              <button
                onClick={handleDashboardRedirect}
                className="blue_btn ms-4 d-flex align-items-center gap-1"
              >
                Dashboard
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      {open && (
        <div className="mobile-menu">
          <div className="menu-header">
             <Link className="navbar-brand d-flex align-items-center gap-2" to="/"  onClick={closeMenu} >
            <img src="/images/logo_new.png" alt="logo" width={200} />
          </Link>
            <button onClick={() => setOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <ul className="menu-links">
            <li><Link to="/hosts" onClick={closeMenu}><Building2 size={18} /> For Hosts</Link></li>
            <li><Link to="#rent" onClick={closeMenu}><Home size={18} /> For Rent</Link></li>
            <li>
              <Link to="/?scroll=about" onClick={closeMenu}>
                <Home size={18} /> About
              </Link>
              </li>
          </ul>

          {/*  Mobile Login */}
          {!isAuthenticated && (
            <Link to="/login" onClick={closeMenu}>
              <button className="blue_btn mt-auto ms-3 d-flex align-items-center justify-content-center gap-2">
                Login
                <LogIn size={18} />
              </button>
            </Link>
          )}

          {/*  Mobile Logged In */}
          {isAuthenticated && isStudent && (
            <div className="mt-auto ms-3 d-flex flex-column gap-2">
              <Link to="/my-account" onClick={closeMenu}>
                <button className="blue_btn w-100">
                 <User /> My Account
                </button>
              </Link>
              <Link onClick={handleLogout}>
                <button className="blue_btn text-danger w-100">
                  <LogOut/> Logout
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Host/Admin */}
          {isAuthenticated && isDashboardRole && (
            <div className="mt-auto ms-3">
              <button
                onClick={() => {
                  closeMenu()
                  handleDashboardRedirect()
                }}
                className="blue_btn w-100"
              >
                Dashboard
              </button>
            </div>
          )}
          
        </div>
      )}
    </>
  );
};

export default Navbar;
