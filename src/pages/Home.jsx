/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import MovieCard from "../components/MovieCard/MovieCard";
import PaginationRounded from "../components/Pagination/Pagination";
import { Skeleton, Stack } from "@mui/material";
import SearchBox from "../components/SearchBox/SearchBox.jsx";
import { useLocation } from "react-router-dom";

const Home = () => {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, SetNumOfPages] = useState();
  const location = useLocation();
  const updateDocsTitle = () => {
    const title = location.pathname.slice(1);
    document.title = `Movie App | ${title}`;
  }

  const fetchHome = async () => {
    setData([]);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();

    console.log(data.results);
    setData(data.results);
    SetNumOfPages(data.total_pages);
  };

  useEffect(() => {
    updateDocsTitle
  }, []);

  useEffect(() => {
    fetchHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  console.log(`home re-render`);
  return (
    <div className="container home">
      <Carousel type="upcoming" />
      <div className="filterNSearch">
        <SearchBox />
      </div>
      <div className="card-container">
        {/* ?? */}
        {(data.length === 0 ? Array.from({ length: 20 }) : data).map(
          (MoiveCardData, index) =>
            MoiveCardData ? (
              <MovieCard
                key={MoiveCardData.id}
                id={MoiveCardData.id}
                title={MoiveCardData.title || MoiveCardData.name || MoiveCardData.original_name}
                type={"movie"}
                //?
                poster={MoiveCardData.poster_path}
                date={MoiveCardData.release_date || MoiveCardData.first_air_date || ""}
              />
            ) : (
              // eslint-disable-next-line react/jsx-key
              <Stack
                key={index}
                spacing={1}
                sx={{
                  bgcolor: "grey.700",
                  width: 220,
                  borderRadius: "8px",
                  padding: 1,
                  textAlign: "center",
                }}
              >
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={200}
                  height={220}
                />
                <Skeleton variant="rounded" width={200} height={60} />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </Stack>
            )
        )}
      </div>
      <PaginationRounded setPage={setPage} numOfPages={numOfPages} />
    </div>
  );
};

export default Home;
