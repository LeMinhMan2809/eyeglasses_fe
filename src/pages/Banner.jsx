import React from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    >
      <SwiperSlide>
        <div>
          <img src={banner2} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          <img src={banner1} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          <img src={banner2} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          <img src={banner1} alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
