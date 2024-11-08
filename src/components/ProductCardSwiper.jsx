import React, { useContext } from "react";
import productImage from "../assets/product/prada.jpg";
import { StoreContext } from "../context/StoreContext";

const ProductCardSwiper = (props) => {
  return (
    <>
      <div className="border-2 rounded-xl w-[280px] flex flex-col">
        <div className="w-[270px] h-[280px] flex justify-center items-center self-center rounded-xl">
          <img className="rounded-xl" src={productImage} alt={""}></img>
        </div>

        <div className="p-5">
          <p className="text-xl font-semibold">Prada</p>
          <div>
            <span className="text-lg font-medium pt-5 text-red-500">
              {props.price}{" "}
              <span className="text-lg font-medium pt-5">VNĐ</span>
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

export default ProductCardSwiper;
