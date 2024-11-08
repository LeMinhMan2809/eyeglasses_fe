import React, { useState, useEffect, useContext } from "react";
import Banner from "./Banner";
import { StoreContext } from "../context/StoreContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import ProductCardSwiper from "../components/ProductCardSwiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import ProductCard from "../components/ProductCard";

import warrantyIcon from "../assets/warranty.png";
import { listProducts } from "../utils/handleAPI";

const Home = () => {
  const { url, token, setToken, isFocused } = useContext(StoreContext);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    listProducts("/api/product").then((res) => {
      setProductData(res);
    });
  }, []);

  return (
    <div className={`page-container ${isFocused ? "blurred" : ""}`}>
      <Banner />

      <div className="mt-5 ml-[80px] mr-[80px]">
        <h3 className="text-3xl pb-5">Bán chạy nhất</h3>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <ProductCardSwiper />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCardSwiper />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCardSwiper />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCardSwiper />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCardSwiper />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="mt-[5rem] ml-[80px] mr-[80px]">
        <h3 className="text-3xl pb-5">Sản phẩm </h3>
        <div className="grid grid-cols-4 gap-5">
          {productData.map((product, index) => (
            <Link to={`/product/${product._id}`} key={index}>
              <ProductCard
                key={index}
                name={product.name}
                images={product.images}
                price={product.price}
                description={product.description}
              />
            </Link>
          ))}
        </div>
      </div>

      <hr className="mt-[5rem]"></hr>

      <div className="mx-[80px] my-10 grid grid-cols-4 justify-items-center">
        <div className="flex self-center items-center gap-3">
          <img className="w-[50px]" src={warrantyIcon} />
          <p className="font-medium">Bảo hành trọn đời</p>
        </div>

        <div className="flex self-center items-center gap-3">
          <img className="w-[50px]" src={warrantyIcon} />
          <p className="font-medium">Thu cũ đổi mới</p>
        </div>

        <div className="flex self-center items-center gap-3">
          <img className="w-[50px]" src={warrantyIcon} />
          <p className="font-medium">Đo mắt miễn phí</p>
        </div>

        <div className="flex self-center items-center gap-3">
          <img className="w-[50px]" src={warrantyIcon} />
          <p className="font-medium">Đổi trả</p>
        </div>
      </div>

      <hr className=""></hr>
    </div>
  );
};

export default Home;
