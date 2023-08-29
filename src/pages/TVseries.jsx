import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import MovieCard from "../components/MovieCard/MovieCard";
import PaginationRounded from "../components/Pagination/Pagination";
import { Skeleton, Stack } from "@mui/material";
import Genres from "../components/Genres/Genres";
import useGenre from "../useGenre";
import SearchBox from "../components/SearchBox/SearchBox";
import { useLocation } from "react-router-dom";
// import useTitle from "../useTitle";

const TVseries = () => {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, SetNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreURL = useGenre(selectedGenres, genres);
  const location = useLocation();
  const updateTitle = () => {
    const title = location.pathname.slice(1);
    document.title = `Movie App | ${title}`;
  }

  const fetchTVseries = async () => {
    setData([]);
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${page}&with_genres=${genreURL}`
    );
    const data = await response.json();

    console.log(data.results);
    setData(data.results);
    SetNumOfPages(data.total_pages);
  };

  useEffect(() => {
    updateTitle()
  });

  useEffect(() => {
    fetchTVseries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedGenres]);
  return (
    <div className="container">
      <Carousel type="tv" />
      <div className="filterNSearch">
        <Genres
          API_KEY={API_KEY}
          type="tv"
          setPage={setPage}
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        <SearchBox />
      </div>

      <div className="card-container">
        {(data.length === 0 ? Array.from({ length: 20 }) : data).map(
          (MoiveCardData, index) =>
            MoiveCardData ? (
              <MovieCard
                key={MoiveCardData.id}
                id={MoiveCardData.id}
                title={MoiveCardData.title || MoiveCardData.name || MoiveCardData.original_name}
                type={"tv"}
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

export default TVseries;
