import React, { useEffect, useState } from "react";
import thankyou from "../assets/Thanks.png";
const Thanks = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mt-5">
          <img className="w-10" src={thankyou} />
        </div>
        <h1 className="text-2xl font-bold text-center text-green-600">
          Cảm ơn bạn đã đặt hàng
        </h1>
        <div className="mt-6 text-center">
          <button className="px-4 py-2 text-white bg-[#AB886D] rounded hover:bg-[#aa6d3e]">
            <a href="/">Về trang chủ</a>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Thanks;
