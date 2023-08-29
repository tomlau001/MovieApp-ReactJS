/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import MovieCard from "../components/MovieCard/MovieCard";
import "./Pages.css";
import PaginationRounded from "../components/Pagination/Pagination";
import { Skeleton, Stack } from "@mui/material";
import SearchBox from "../components/SearchBox/SearchBox";
import useDocsTitle from "../useDocsTitle";

const Trending = () => {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, SetNumOfPages] = useState();

  useDocsTitle();
  const fetchTrending = async () => {
    setTrendingData([]);
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();

    console.log(data);
    setTrendingData(data.results);
    SetNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <section className="container trending">
      <Carousel type="trending" />
      <div className="filterNSearch">
        <SearchBox />
      </div>
      <div className="card-container">
        {(trendingData.length === 0
          ? Array.from({ length: 20 })
          : trendingData
        ).map((MoiveCardData, index) =>
          MoiveCardData ? (
            <MovieCard
              key={MoiveCardData.id}
              id={MoiveCardData.id}
              title={MoiveCardData.title || MoiveCardData.name}
              type={MoiveCardData.media_type}
              poster={MoiveCardData.poster_path}
              date={MoiveCardData.release_date || MoiveCardData.first_air_date}
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
        )}
      </div>
      <PaginationRounded setPage={setPage} numOfPages={numOfPages} />
    </section>
  );
};

export default Trending;
