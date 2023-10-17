import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Trending from "./pages/Trending.jsx";
import TVseries from "./pages/TVseries.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { Container } from "@mui/material";
import Notfound from "./pages/Notfound/Notfound";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Navbar />}>
      <Route index path="Home" element={<Home />} />
      <Route path="Movie" element={<Movie />} />
      <Route path="Trending" element={<Trending />} />
      <Route path="TVSeries" element={<TVseries />} />
      <Route path="*" element={<Notfound />} />
    </Route>
  )
);

function App() {
  return (
    <Container maxWidth="xl">
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
