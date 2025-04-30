import React from 'react';
import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Banner = () => {
  return (
    <div>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
    </div>
  );
};

export default Banner;