import React from "react";

const ReviewCard = () => {
  return (
    <div className="bg-white p-6 w-full max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Đánh giá & nhận xét</h2>
      <div className="flex items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center">
            <span className="text-white text-xl font-bold">h</span>
          </div>
        </div>
        {/* Review Content */}
        <div className="ml-4">
          <div className="flex items-center mb-2">
            {/* Stars */}
            <div className="flex text-yellow-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <span className="ml-2 text-gray-500 text-sm">12 tháng trước</span>
          </div>
          {/* Reviewer Name */}
          <div className="text-gray-700 font-medium">hoa</div>
          {/* Review Title */}
          <h3 className="font-semibold text-black mt-2">
            sữa rửa mặt dành cho buổi sáng
          </h3>
          {/* Review Body */}
          <p className="text-gray-600 mt-2">
            Da mình rất nhạy cảm nhưng mình rất thích xài loại này vào buổi
            sáng. Rửa mặt cảm giác hơi the mát nhưng không gây khô da, giúp da
            sạch se mịn màng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
