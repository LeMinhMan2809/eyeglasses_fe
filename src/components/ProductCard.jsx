import React, { useContext } from "react";
import productImage from "../assets/product/prada.jpg";
import { StoreContext } from "../context/StoreContext";

const ProductCard = (props) => {
  const { url } = useContext(StoreContext);
  return (
    <>
      <div className="border-2 rounded-xl w-[280px] h- flex flex-col bg-white hover:cursor-pointer">
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

            <span className="text-base font-medium pt-5 pl-3 line-through">
              200.000 VNĐ
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
