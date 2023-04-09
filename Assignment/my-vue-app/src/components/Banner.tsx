import img from "../assets/banner3.png";
import img1 from "../assets/banner1.png";
import img2 from "../assets/banner2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination,Autoplay } from "swiper";

const Banner = () => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Pagination,Autoplay]}
      className="container mx-auto object-cover h-[500px]"
    >
      <SwiperSlide>
        <img src={img} alt="" className="h-full w-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} alt="" className="h-full w-full object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} alt="" className="h-full w-full object-cover" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
