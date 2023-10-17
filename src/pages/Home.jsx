/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import MovieCard from "../components/MovieCard/MovieCard";
import PaginationRounded from "../components/Pagination/Pagination";
import { Skeleton, Stack } from "@mui/material";
import SearchBox from "../components/SearchBox/SearchBox.jsx";
import useDocsTitle from "../useDocsTitle";
import { API_KEY } from "../config";

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const [searchData, setSearchData] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  useDocsTitle();

  const fetchHome = async () => {
    setHomeData([]);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();

    console.log(data);
    setHomeData(data.results);
    setNumOfPages(data.total_pages);
  };

  const fetchingSearch = async (param) => {
    setIsSearching(true);
    if (param === "") {
      fetchHome();
      return;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${param}&page=${page}`
    );
    const data = await response.json();
    setSearchData(data.results);
    setNumOfPages(data.total_pages);
    console.log(data);
  };

  useEffect(() => {
    if (isSearching) {
      fetchingSearch(searchParam);
    } else {
      fetchHome();
    }
  }, [searchParam, page]);

  return (
    <section className="container home">
      <Carousel type="upcoming" />
      <div className="filterNSearch">
        <SearchBox
          setSearchParam={setSearchParam}
          searchParam={searchParam}
          setIsSearching={setIsSearching}
          fetchingSearch={fetchingSearch}
          fetchData={fetchHome}
          setPage={setPage}
        />
      </div>
      <div className="card-container">
        {isSearching && searchData.length === 0 ? (
          <p>{`No Results Related to "${searchParam}"`}</p>
        ) : (
          (isSearching ? searchData : homeData).map((MovieCardData, index) =>
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

export default Home;
