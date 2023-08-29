/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel/Carousel";
import MovieCard from "../components/MovieCard/MovieCard";
import PaginationRounded from "../components/Pagination/Pagination";
import { Skeleton, Stack } from "@mui/material";
import SearchBox from "../components/SearchBox/SearchBox.jsx";
import useDocsTitle from "../useDocsTitle";

const Home = () => {
  const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;
  const [Homedata, setHomeData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, SetNumOfPages] = useState();
  useDocsTitle();

  const fetchHome = async () => {
    setHomeData([]);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();

    console.log(data);
    setHomeData(data.results);
    SetNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchHome();
  }, [page]);

  return (
    <section className="container home">
      <Carousel type="upcoming" />
      <div className="filterNSearch">
        <SearchBox />
      </div>
      <div className="card-container">
        {(Homedata.length === 0 ? Array.from({ length: 20 }) : Homedata).map(
          (MoiveCardData, index) =>
            MoiveCardData ? (
              <MovieCard
                key={MoiveCardData.id}
                id={MoiveCardData.id}
                title={
                  MoiveCardData.title ||
                  MoiveCardData.name ||
                  MoiveCardData.original_name
                }
                type={"movie"}
                poster={MoiveCardData.poster_path}
                date={
                  MoiveCardData.release_date ||
                  MoiveCardData.first_air_date ||
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
        )}
      </div>
      <PaginationRounded setPage={setPage} numOfPages={numOfPages} />
    </section>
  );
};

export default Home;
