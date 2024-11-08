import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getWishByUserID } from "../utils/wishAPI";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ProductCardWish from "../components/ProductCardWish";
import { getProductIDAPI } from "../utils/handleAPI";

const WishList = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!token) {
      useNavigate("/login");
    } else {
      axios
        .get("http://localhost:4000/api/user/profile", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUser(res.data);
          getWishByUserID(
            "/api/wishlist/wishListUser/?user=" + res.data._id
          ).then((resWish) => {
            console.log(resWish);
            setIsFavorite(true);

            const productIds = resWish.map((item) => item.product);
            console.log(productIds);
            Promise.all(
              productIds.map((products) =>
                getProductIDAPI("/api/product/", products._id)
              )
            ).then((productResults) => {
              // Set all fetched products at once
              setWishlistProducts(productResults);
              setIsLoading(false);
            });
          });
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, []);

  // const handleFavorite = () => {
  //   if (!productData || !userProfile[0]) {
  //     <div>Loading product details...</div>;
  //   } else {
  //     const wishList = {
  //       product: productData._id,
  //       user: userProfile[0]._id,
  //     };
  //     if (isFavorite === true) {
  //       console.log("remove");
  //       const url =
  //         "/api/wishList/removeWishProduct?product=" +
  //         productData._id +
  //         "&user=" +
  //         userProfile[0]._id;
  //       removeWish(url).then((res) => {
  //         if (res.success) {
  //           toast.success("Đã xóa trong danh sách yêu thích");
  //           setIsFavorite(false);
  //         } else {
  //           toast.error(res.message);
  //         }
  //       });
  //     } else {
  //       console.log("add");
  //       addWish("/api/wishlist/add", wishList).then((res) => {
  //         if (res.success) {
  //           setIsFavorite(true);
  //           toast.success("Đã thêm vào danh sách yêu thích");
  //         } else {
  //           toast.error(res.message);
  //         }
  //       });
  //     }
  //   }
  // };

  return (
    <div>
      <div className="ml-[90px] mr-[80px] mt-8">
        <h1 className="text-2xl mb-4">Sản phẩm yêu thích</h1>
        {wishlistProducts.length === 0 ? (
          <h1 className="text-xl mb-4 text-center">
            Hiện tại chưa có sản phẩm yêu thích
          </h1>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {isLoading ? (
              <Box
                className="flex justify-center items-center mt-10"
                sx={{ display: "flex" }}
              >
                <CircularProgress />
              </Box>
            ) : (
              wishlistProducts.map((product, index) => (
                <Link to={`/product/${product._id}`} key={index}>
                  <ProductCardWish
                    key={index}
                    name={product.name}
                    images={product.images}
                    price={product.price}
                    isFavorite={isFavorite}
                  />
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
