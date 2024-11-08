import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import productImage from "../assets/HMK_glasses.png";
import { getProductIDAPI, listProducts } from "../utils/handleAPI";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addReviewAPI, getReviewAPI } from "../utils/reviewAPI";

const ProductDetail = () => {
  // const { url, token, setToken, isFocused } = useContext(StoreContext);
  const token = localStorage.getItem("token");

  const context = useContext(StoreContext);
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setInputValue] = useState(1);
  const [productData, setProductData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductIDAPI("/api/product/", id).then((res) => {
      setProductData(res);
      if (token) {
        setIsLoggedIn(true);
      }
    });
    getReviewAPI("/api/review/" + id).then((res) => {
      setReviewData(res);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUserProfile([res.data]);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  // const addToCartHandler = () => {
  //   if (!isLoggedIn) {
  //     toast.error("Bạn phải đăng nhập để thêm vào giỏ hàng!");
  //   } else {
  //     context.addToCart(productData, value);
  //   }
  // };
  const addToCartHandler = () => {
    context.addToCart(productData, value);
    toast.success("Đã thêm vào giỏ hàng");
  };

  const onIncrease = () => {
    setInputValue(value + 1);
  };
  const onDecrease = () => {
    if (value > 1) {
      setInputValue(value - 1);
    }
  };

  //Review
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value });
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const [reviewFormData, setReviewFormData] = useState({
    title: "",
    content: "",
    rating: 0,
    user: "",
    product: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      title: reviewFormData.title,
      content: reviewFormData.content,
      rating: rating,
      user: userProfile[0]._id,
      product: productData._id,
    };
    addReviewAPI("/api/review/add", review).then((res) => {
      if (res.success) {
        toast.success("Đánh giá thành công");
        setReviewFormData({
          title: "",
          content: "",
          rating: 0,
          user: "",
        });
      } else {
        toast.error("Đánh giá thất bại");
      }
    });
  };

  // console.log({ rating, title, content, image });

  return (
    <div>
      <div className="ml-[150px] mr-[150px] mt-[4rem] flex gap-10 bg-white">
        <div>
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1}
            src={"http://localhost:4000/images/" + productData.images}
            className="w-[600px] h-[600px] rounded-xl"
          />
          {/* <img className="w-[600px] rounded-xl" src={productImage} alt="" /> */}
          <button>
            {isFavorite ? (
              <FavoriteIcon className="absolute left-[680px] top-[200px] cursor-pointer" />
            ) : (
              <FavoriteBorderIcon
                onClick={() => setIsFavorite(true)}
                className="absolute left-[680px] top-[200px] cursor-pointer"
              />
            )}
          </button>
          <FavoriteBorderIcon className="absolute left-[680px] top-[200px] cursor-pointer" />
          {/*  */}
        </div>

        <div>
          <p className="text-3xl font-bold">{productData.name}</p>

          <div className="mt-5">
            <span className="text-xl font-medium pt-5 text-red-500">
              {productData.price
                ? productData.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : "Loading..."}
            </span>
            <span className="text-base font-medium pt-5 pl-3 line-through">
              200.000 VNĐ
            </span>
          </div>

          <p className="mt-5">{productData.description}</p>

          <div className="flex self-center gap-8">
            <div className="mt-5 bg-[#c3a26a] w-[8rem] px-5 py-3 rounded-xl">
              <button>
                <RemoveIcon onClick={onDecrease} />
              </button>
              <input
                onChange={(e) => setInputValue(e.target.value)}
                className="w-10 text-center text-white font-medium bg-[#c3a26a]"
                type="text"
                value={value}
              />
              <button>
                <AddIcon onClick={onIncrease} />
              </button>
            </div>

            <div>
              <button
                onClick={() => addToCartHandler()}
                className="bg-[#c3a26a] text-white font-medium rounded-xl px-10 py-3 mt-5"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="ml-[150px] mr-[150px]"></hr>

      {/* Review */}
      <div className="ml-[150px] mr-[150px] bg-white pb-8">
        {token ? (
          <>
            <div className="bg-white p-6 rounded-lg w-full">
              <h2 className="text-lg font-semibold mb-4">Đánh giá</h2>

              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-2xl ${
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Review Title */}
              <div className="mb-4">
                <label className="block font-medium mb-2">
                  Tiêu đề đánh giá
                </label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề đánh giá của bạn"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
                  name="title"
                  value={reviewFormData.title}
                  onChange={handleChange}
                />
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Nội dung</label>
                <textarea
                  placeholder="Viết nội dung đánh giá của bạn"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
                  rows="4"
                  name="content"
                  value={reviewFormData.content}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-4 p-6">
              Đánh giá & nhận xét
            </h2>
            {reviewData.map((review) => (
              <div key={review._id} className="flex items-start ml-5 mb-5">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">M</span>
                  </div>
                </div>
                {/* Review Content */}
                <div className="ml-4">
                  <div className="flex items-center">
                    {/* Stars */}
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="ml-2 text-gray-500 text-sm">
                      {review.createdAt.substring(0, 10)}
                    </span>
                  </div>
                  {/* Reviewer Name */}
                  <div className="text-gray-700 font-medium">
                    {review.user.name}
                  </div>
                  {/* Review Title */}
                  <h3 className="font-semibold text-black mt-5">
                    {review.title}
                  </h3>
                  {/* Review Body */}
                  <p className="text-gray-600 mt-2">{review.content}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4 p-6">
              Đánh giá & nhận xét
            </h2>
            {reviewData.map((review) => (
              <div key={review._id} className="flex items-start ml-5 mb-5">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">M</span>
                  </div>
                </div>
                {/* Review Content */}
                <div className="ml-4">
                  <div className="flex items-center">
                    {/* Stars */}
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="ml-2 text-gray-500 text-sm">
                      {review.createdAt.substring(0, 10)}
                    </span>
                  </div>
                  {/* Reviewer Name */}
                  <div className="text-gray-700 font-medium">
                    {review.user.name}
                  </div>
                  {/* Review Title */}
                  <h3 className="font-semibold text-black mt-5">
                    {review.title}
                  </h3>
                  {/* Review Body */}
                  <p className="text-gray-600 mt-2">{review.content}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
