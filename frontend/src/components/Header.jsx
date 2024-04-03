import React from "react";
import { Link } from "react-router-dom";

// import Logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <nav>
      <div className="container nav_container">
        <Link to={"/"} className="nav_logo">
          <img alt="Navbar Logo" />
        </Link>

        <ul className="nav_menu">
          <li>
            <Link to={"/user"}>Ernest Achiever</Link>
          </li>
          <li>
            <Link to={"/post/create"}>Create Post</Link>
          </li>
          <li>
            <Link to={"/author"}>Authors</Link>
          </li>
          <li>
            <Link to={"/auth/logout"}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
