import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./../../app.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import IMAGES from "../../Images/Images";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Slider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="h-[50vh] w-1/2 bg-black ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide className="bg-green-950 relative">
          <img className="w-full  h-full" src={IMAGES.Image4} alt="" />
          <div className="absolute bottom-1 left-1 transform   text-white p-4 rounded-lg backdrop-blur-sm bg-opacity-40 bg-black">
            <h2 className="text-2xl mb-2">Stadium 1</h2>
            <p className="mb-4">
              This is a beautiful stadium located in city 1.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="bg-green-950 relative">
          <img className="w-full  h-full" src={IMAGES.Image5} alt="" />
          <div className="absolute bottom-1 left-1 transform   text-white p-4 rounded-lg backdrop-blur-sm bg-opacity-40 bg-black">
            <h2 className="text-2xl mb-2">Stadium 2</h2>
            <p className="mb-4">
              This is a beautiful stadium located in city 2.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="bg-green-950 relative">
          <img className="w-full  h-full" src={IMAGES.Image4} alt="" />
          <div className="absolute bottom-1 left-1 transform   text-white p-4 rounded-lg backdrop-blur-sm bg-opacity-40 bg-black">
            <h2 className="text-2xl mb-2">Stadium 3</h2>
            <p className="mb-4">
              This is a beautiful stadium located in city 3.
            </p>
          </div>
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
