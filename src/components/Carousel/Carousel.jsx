/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "./Carousel.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import noImg from "../../assets/noImg.png";
import { API_KEY } from "../../config";

const Carousel = ({ type }) => {
  const [data, setData] = useState([]);

  const fetchCarousel = async () => {
    let url;

    if (type === "trending") {
      url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
    } else if (type === "upcoming") {
      url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
    } else {
      url = `https://api.themoviedb.org/3/${type}/top_rated?api_key=${API_KEY}`;
    }

    const response = await fetch(url);
    const { results } = await response.json();
    const limitedData = results.slice(0, 10);
    setData(limitedData);
  };

  useEffect(() => {
    fetchCarousel();
  }, []);
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      autoplay={{
        delay: 4500,
        disableOnInteraction: true,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {data &&
        data.map(
          ({ backdrop_path, overview, title, id, name, release_date }) => {
            return (
              <SwiperSlide key={id}>
                <div className="carousel-content">
                  {
                    <h4 className="carousel-title">
                      {title || name}
                      {type === "upcoming" &&
                        ` (Release date: ${release_date
                          .substring(5)
                          .split("-")
                          .reverse()
                          .join("/")})`}
                    </h4>
                  }
                  <p className="carousel-des">
                    {overview.length > 260
                      ? `${overview.substring(0, 260)} ...`
                      : overview}
                  </p>
                </div>
                <img
                  className="carousel-img"
                  src={
                    backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
                      : noImg
                  }
                />
              </SwiperSlide>
            );
          }
        )}
    </Swiper>
  );
};
export default Carousel;
