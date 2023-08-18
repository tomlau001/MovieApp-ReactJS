// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "./Carousel.css"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import { useState, useEffect } from "react";

const Carousel = () => {
  // const [data, setData] = useState({});
  // const API_KEY = `984691a982db0dc62bc0e27ae1c406b2`;

  // const fetchImages = async () => {
  //   const response = await fetch(
  //     `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
  //   );
  //   const { data } = response.json();

  //   setData(data);
  //   console.log(data);
  // };

  // useEffect(() => {
  //   fetchImages();
  // }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="src/assets/carousel.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/carousel.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/carousel.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/carousel.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/carousel.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/carousel.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/carousel.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
