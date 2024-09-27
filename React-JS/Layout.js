import { Outlet, Link } from "react-router-dom";
import React from 'react';
 
import { useNavigate } from 'react-router-dom';
import './seller.css';

const Layout = () => {

const navigate = useNavigate();
const handleLogout = () => {
  localStorage.setItem('userdetails', "null");
  navigate('/auth');
};

// ... rest of your component code
const name = localStorage.getItem("username");
  return (
    <>
      <nav style={{ backgroundColor: "black", display: "flex", justifyContent: "flex-end", padding: "10px" }}>
      <p className="p">Welcome {name} !!!</p>
  <ul style={{ listStyleType: "none", margin: 0, padding: 0, display: "flex", gap: "20px",marginRight:"20px" }}>
    
    
    <li>
      <Link to="/predict" style={{ textDecoration: "none", color: "white" }}>
        Image
      </Link>
    </li>
    <span style={{ color: "white" }}>|</span>
    <li>
      <Link to="/chatbot" style={{ textDecoration: "none", color: "white" }}>
        Chat Bot
      </Link>
    </li>
    <span style={{ color: "white" }}>|</span>
    
    <li>
      <Link to="/auth" onClick={handleLogout} style={{ textDecoration: "none", color: "red" }}>
        Logout
      </Link>
  </li>
  </ul>
</nav>



      <Outlet />
    </>
  )
};

export default Layout;