import React, { useState, useEffect, useContext } from "react";
import Banner from "./Banner";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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
import { listProducts, listCategories } from "../utils/handleAPI";

const Home = () => {
  const maxPaginationBullets = 5; // Set the limit for pagination bullets

  const { url, token, setToken, isFocused } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [productDataSwiper, setProductDataSwiper] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    listCategories("/api/category").then((res) => {
      setCategoryData(res);
      setLoading(false);
    });
  }, []);

  //Get products by category
  useEffect(() => {
    listProducts("/api/product").then((res) => {
      setProductDataSwiper(res.slice(0, 8));
      setLoading(false);
    });
    if (categoryData && categoryData.length > 0) {
      // Ensure categoryData is populated before making the API call
      listProducts("/api/product/category/" + categoryData[0]?._id).then(
        (res) => {
          setProductData(res.slice(0, 8));
          setLoading(false);
        }
      );
    }
  }, [categoryData]);

  return (
    <div className={`page-container ${isFocused ? "blurred" : ""}`}>
      <Banner />

      <div className="mt-5 ml-[80px] mr-[80px] bg-white">
        <h3 className="text-3xl pb-5">Bán chạy nhất</h3>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          // navigation={true}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            // renderBullet: (index, className) => {
            //   // Render only the first `maxPaginationBullets` bullets
            //   if (index < maxPaginationBullets) {
            //     return `<span class="${className}"></span>`;
            //   }
            //   return ""; // Return an empty string for bullets beyond the limit
            // },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          style={{
            "--swiper-navigation-color": "white",
            "--swiper-pagination-color": "green",
            "--swiper-navigation-size": "5rem",
            "--swiper-pagination-margin-top": "20px",
          }}
        >
          {productDataSwiper.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCardSwiper
                key={index}
                name={product.name}
                images={product.images}
                price={product.price}
                description={product.description}
              />
            </SwiperSlide>
          ))}
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
        <div className="mt-6 text-center text-xl font-semibold border-[#E1D7C6] border-2 cursor-pointer hover:bg-orange-300 py-2 rounded-full">
          {loading ? (
            <Box
              className="flex justify-center items-center mt-10"
              sx={{ display: "flex" }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Link to={`/category/${categoryData[0]._id}`}>
              Xem thêm sản phẩm
            </Link>
          )}
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
