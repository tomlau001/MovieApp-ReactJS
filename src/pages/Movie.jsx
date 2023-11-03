/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import MovieCard from "../components/MovieCard/MovieCard";
import PaginationRounded from "../components/Pagination/Pagination";
import { Skeleton, Stack } from "@mui/material";
import Genres from "../components/Genres/Genres";
import useGenre from "../useGenre";
import SearchBox from "../components/SearchBox/SearchBox.jsx";
import useDocsTitle from "../useDocsTitle";
import { API_KEY } from "../config";

const Movie = () => {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreURL = useGenre(selectedGenres, genres);

  const [isSearching, setIsSearching] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [searchData, setSearchData] = useState([]);

  useDocsTitle();
  const fetchMovie = async () => {
    setMovieData([]);
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genreURL}`
    );
    const data = await response.json();

    // console.log(data);
    setMovieData(data.results);
    setNumOfPages(data.total_pages);
  };

  const fetchingSearch = async (param) => {
    setIsSearching(true);
    setSelectedGenres([]);

    if (param === "") {
      fetchMovie();
      return;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${param}&page=${page}`
    );
    const data = await response.json();
    setSearchData(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    if (isSearching) {
      fetchingSearch(searchParam);
    } else {
      fetchMovie();
    }
  }, [searchParam, page]);

  useEffect(() => {
    fetchMovie();
  }, [selectedGenres]);

  return (
    <section className="container">
      <Carousel type="movie" />
      <div className="filterNSearch">
        <Genres
          API_KEY={API_KEY}
          type={"movie"}
          setPage={setPage}
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        <SearchBox
          setSearchParam={setSearchParam}
          searchParam={searchParam}
          setIsSearching={setIsSearching}
          fetchingSearch={fetchingSearch}
          fetchData={fetchMovie}
          setPage={setPage}
        />
      </div>

      <div className="card-container">
        {isSearching && searchData.length === 0 ? (
          <p>{`No Results Related to "${searchParam}"`}</p>
        ) : (
          (isSearching ? searchData : movieData).map((MovieCardData, index) =>
            MovieCardData ? (
              <MovieCard
                key={MovieCardData.id}
                id={MovieCardData.id}
                title={
                  MovieCardData.title ||
                  MovieCardData.name ||
                  MovieCardData.original_name
                }
                type={MovieCardData.media_type || "movie"}
                poster={MovieCardData.poster_path}
                date={
                  MovieCardData.release_date ||
                  MovieCardData.first_air_date ||
                  ""
                }
              />
            ) : (
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
          )
        )}
      </div>
      <PaginationRounded
        setPage={setPage}
        numOfPages={numOfPages}
        page={page}
      />
    </section>
  );
};

export default Movie;
