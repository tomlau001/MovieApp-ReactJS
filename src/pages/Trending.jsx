import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import MovieCard from "../components/MovieCard/MovieCard";
import "./Pages.css";
import PaginationRounded from "../components/Pagination/Pagination";
import { Skeleton, Stack } from "@mui/material";

const Trending = () => {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, SetNumOfPages] = useState();
  const fetchTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();

    console.log(data);
    setData(data.results);
    SetNumOfPages(data.total_pages);
  };

  useEffect(() => {
    setTimeout(() => fetchTrending(), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <div className="container">
        <Carousel />
        <div className="card-container">
          {(data.length === 0 ? Array.from({ length: 20 }) : data).map(
            (c, index) =>
              c ? (
                <MovieCard
                  key={c.id}
                  id={c.id}
                  title={c.title || c.name}
                  type={c.media_type}
                  poster={c.poster_path}
                  date={c.release_date || c.first_air_date}
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
      </div>
      <PaginationRounded setPage={setPage} numOfPages={numOfPages} />
    </>
  );
};

export default Trending;
