import { NavLink, Outlet, useLocation } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "./Navbar.css";
import Home from "../../pages/Home";

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <NavLink className="navlink" to="/Home">
              <HomeIcon />
              <span className="hide-text">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/Movie">
              <TheatersIcon />
              Movie
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/TVSeries">
              <LiveTvIcon />
              TV Series
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/Trending">
              <WhatshotIcon />
              Trending
            </NavLink>
          </li>
        </ul>
      </nav>

      <main>{location.pathname === "/" ? <Home /> : <Outlet />}</main>
    </>
  );
};

export default Navbar;
