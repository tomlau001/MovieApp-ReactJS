/* eslint-disable react-hooks/exhaustive-deps */
import { Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import MovieCard from "../components/MovieCard/MovieCard";
import PaginationRounded from "../components/Pagination/Pagination";
import SearchBox from "../components/SearchBox/SearchBox";
import useDocsTitle from "../useDocsTitle";
import { API_KEY } from "../config";

import "./Pages.css";

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, SetNumOfPages] = useState();

  const [searchData, setSearchData] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  useDocsTitle();

  const fetchTrending = async () => {
    setIsSearching(false);
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    setTrendingData(data.results);
    SetNumOfPages(data.total_pages);
  };

  const fetchingSearch = async (param) => {
    setIsSearching(true);
    if (param === "") {
      fetchTrending();
      return;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${param}&page=${page}`
    );
    const data = await response.json();
    setSearchData(data.results);
    SetNumOfPages(data.total_pages);
  };

  useEffect(() => {
    if (isSearching) {
      fetchingSearch(searchParam);
    } else {
      fetchTrending();
    }
  }, [searchParam, page]);

  return (
    <section className="container trending">
      <Carousel type="trending" />
      <div className="filterNSearch">
        <SearchBox
          setIsSearching={setIsSearching}
          setSearchParam={setSearchParam}
          searchParam={searchParam}
          fetchingSearch={fetchingSearch}
          fetchData={fetchTrending}
          setPage={setPage}
        />
      </div>

      <div className="card-container">
        {isSearching && searchData.length === 0 ? (
          <p>{`No Results Related to "${searchParam}"`}</p>
        ) : (
          (isSearching ? searchData : trendingData).map(
            (MovieCardData, index) =>
              MovieCardData ? (
                <MovieCard
                  key={MovieCardData.id}
                  id={MovieCardData.id}
                  title={MovieCardData.title || MovieCardData.name}
                  type={MovieCardData.media_type}
                  poster={MovieCardData.poster_path}
                  date={
                    MovieCardData.release_date || MovieCardData.first_air_date
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

export default Trending;
