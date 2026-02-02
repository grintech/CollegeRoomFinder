import { useState } from "react";
import {
  Menu,
  X,
  GraduationCap,
  Building2,
  Home,
  LogIn
} from "lucide-react";

import { Link } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);


  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-xl custom-navbar">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2" >
            <img src="/images/logo_new.png" alt="logo" width={200} />
            {/* <h3 className="mb-0 fw-bold">CollegeRoomFinder</h3> */}
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
              <li><Link to="#about">About</Link></li>
              <li><Link to="#universities">For Universities</Link></li>
              <li><Link to="#landlords">For Landlords & Property Managers</Link></li>
              <li><Link to="#rent">For Rent</Link></li>
            </ul>

           <Link to="/login">
            <button className="blue_btn ms-4 d-flex align-items-center gap-1">
               Login
              <LogIn size={16} />
            </button>
           </Link>
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
            <li><Link to="/" onClick={closeMenu}><Home size={18} /> About </Link></li>
            <li><Link to="/" onClick={closeMenu}><GraduationCap size={18} /> For Universities</Link></li>
            <li><Link to="/" onClick={closeMenu}><Building2 size={18} /> For Landlords & Property Managers</Link></li>
            <li><Link to="/" onClick={closeMenu}><Home size={18} /> For Rent</Link></li>
          </ul>

        <Link to="/login"  onClick={closeMenu}>
          <button className="blue_btn mt-auto d-flex align-items-center justify-content-center gap-2">
           Login
            <LogIn size={18} />
          </button>
        </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
