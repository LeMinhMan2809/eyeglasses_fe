import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductCardWish = (props) => {
  const { url } = useContext(StoreContext);
  const [wishList, setWishList] = useState([]);

  const handleFavorite = () => {};
  return (
    <>
      <div className="border-2 rounded-xl w-[280px] flex flex-col bg-white hover:cursor-pointer">
        <button>
          {props.isFavorite ? (
            <FavoriteIcon className="text-red-500 mt-5 ml-[10rem] cursor-pointer" />
          ) : (
            <FavoriteBorderIcon className="absolute left-[320px] top-[200px] cursor-pointer" />
          )}
        </button>
        <div className="w-[270px] h-[280px] flex justify-center items-center self-center rounded-xl hoverZoom">
          <img
            className="rounded-xl"
            src={url + "/images/" + props.images}
            alt={""}
          ></img>
        </div>

        <div className="p-5 rounded-lg">
          <p className="text-xl font-semibold">{props.name}</p>
          <div>
            <span className="text-lg font-medium pt-5 text-red-500">
              {props.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardWish;
