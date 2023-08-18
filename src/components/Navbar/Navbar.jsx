import { NavLink, Outlet } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "./Navbar.css";
import { Button } from "@mui/material";
// import SearchBox from "../SearchBox";


const Navbar = () => {
  return (
    <div>
      <nav className="nav">
        <NavLink className="navlink" to="/">
          <Button variant="text">
            <HomeIcon />
          </Button>
        </NavLink>

        <NavLink className="navlink" to="movie">
          <Button variant="text" startIcon={<TheatersIcon />}>
            Movie
          </Button>
        </NavLink>
        <NavLink className="navlink" to="TVSeries">
          <Button variant="text" startIcon={<LiveTvIcon />}>
            TV Series
          </Button>
        </NavLink>
        <NavLink className="navlink" to="trending">
          <Button variant="text" startIcon={<WhatshotIcon />}>
            Trending
          </Button>
        </NavLink>
        {/* <SearchBox/> */}
      </nav>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;