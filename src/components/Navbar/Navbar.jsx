import { NavLink, Outlet, useLocation } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "./Navbar.css";
import { Button } from "@mui/material";
import Home from "../../pages/Home";

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <nav className="nav">
        <NavLink className="navlink" to="Home">
          <Button variant="text">
            <HomeIcon />
          </Button>
        </NavLink>
        <NavLink className="navlink" to="Movie">
          <Button variant="text" startIcon={<TheatersIcon />}>
            Movie
          </Button>
        </NavLink>
        <NavLink className="navlink" to="TVSeries">
          <Button variant="text" startIcon={<LiveTvIcon />}>
            TV Series
          </Button>
        </NavLink>
        <NavLink className="navlink" to="Trending">
          <Button variant="text" startIcon={<WhatshotIcon />}>
            Trending
          </Button>
        </NavLink>
      </nav>

      <main>{location.pathname === "/" ? <Home /> : <Outlet />}</main>
    </>
  );
};

export default Navbar;
