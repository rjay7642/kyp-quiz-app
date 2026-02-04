import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `nav-item${isActive ? " active" : ""}`
        }
      >
        <span className="nav-dot" />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/leaderboard"
        className={({ isActive }) =>
          `nav-item${isActive ? " active" : ""}`
        }
      >
        <span className="nav-dot" />
        <span>Leaderboard</span>
      </NavLink>
      <NavLink
        to="/quiz/basic"
        className={({ isActive }) =>
          `nav-item${isActive ? " active" : ""}`
        }
      >
        <span className="nav-dot" />
        <span>Daily</span>
      </NavLink>
      <NavLink
        to="/result"
        className={({ isActive }) =>
          `nav-item${isActive ? " active" : ""}`
        }
      >
        <span className="nav-dot" />
        <span>Result</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
