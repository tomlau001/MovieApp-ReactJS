/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import MovieCard from "../components/MovieCard/MovieCard";
import "./Pages.css";
import PaginationRounded from "../components/Pagination/Pagination";
import { Skeleton, Stack } from "@mui/material";
import SearchBox from "../components/SearchBox/SearchBox";
import { useLocation } from "react-router-dom";

const Trending = () => {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, SetNumOfPages] = useState();
  const [searchData, setSearchData] = useState([]);
  const location = useLocation();

  const updateTitle = () => {
    const title = location.pathname.slice(1);
    document.title = `Movie App | ${title}`;
  }

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
  
  //callback props
  const handleSearch = () => {
    setSearchData(searchData);
  };

  useEffect(() => {
    updateTitle()
  },[]);

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <>
      <div className="container trending">
        <Carousel type="trending" />
        <div className="filterNSearch">
          <SearchBox onSubmit={handleSearch} page={page} setSearchData={setSearchData} SetNumOfPages={SetNumOfPages}/>
        </div>
        <div className="card-container">
        {/* Array.from({ length: 20 }) */}
        {(searchData.length === 0 ? trendingData : searchData).map((MoiveCardData, index) =>
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
      </div>
      <PaginationRounded setPage={setPage} numOfPages={numOfPages} />
    </>
  );
};

export default Trending;
