import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../index.css";

const FilterSideBar = ({ handleBrandChange }) => {
  const brands = ["Prada", "Chrome Hearts", "Dior", "Bolon", "Tom Ford"];
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const initialBrands = brands.slice(0, 4); // Show first 4 brands initially
  const moreBrands = brands.slice(4);
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleBrandChange(name, checked); // Pass the brand and checked status to the parent component
  };
  return (
    <div>
      <div className="mb-4">
        {/* <h2 className="font-bold text-2xl">Lọc theo</h2> */}

        <div className="">
          <h3 className="text-xl font-semibold">Thương hiệu</h3>
          <div className="mt-2 space-y-2">
            {initialBrands.map((brand, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 font-medium"
              >
                <input
                  type="checkbox"
                  name={brand}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                />
                <span>{brand}</span>
              </label>
            ))}

            {showMoreBrands &&
              moreBrands.map((brand, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 font-medium"
                >
                  <input
                    type="checkbox"
                    name={brand}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            {/* <label className="flex items-center space-x-2 font-medium">
              <input
                type="checkbox"
                name="Prada"
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span>Prada</span>
            </label> */}

            {/* <label className="flex items-center space-x-2 font-medium">
              <input
                type="checkbox"
                name="Chrome Hearts"
                className="form-checkbox"
                onChange={handleCheckboxChange}
              />
              <span>Chrome Hearts</span>
            </label>

             */}

            <p
              onClick={() => setShowMoreBrands(!showMoreBrands)}
              className="text-blue-500 cursor-pointer mt-2"
            >
              {showMoreBrands ? "Thu gọn" : "Xem thêm"}
            </p>
          </div>
        </div>
      </div>

      {/* <p className="text-lg font-semibold">Màu sắc</p>
      <div className="ml-2">
        <ul>
          <li>
            <FormControlLabel control={<Checkbox />} label="Đen" />
          </li>
          <li>
            <FormControlLabel control={<Checkbox />} label="Trắng" />
          </li>
          <li>
            <FormControlLabel control={<Checkbox />} label="Nâu" />
          </li>
          <li>
            <FormControlLabel control={<Checkbox />} label="Đỏ" />
          </li>
          <li>
            <FormControlLabel control={<Checkbox />} label="Vàng" />
          </li>
        </ul>
      </div> */}

      {/* <p className="text-lg font-semibold mt-5">Chất liệu</p>
      <div className="ml-2">
        <ul>
          <li>
            <FormControlLabel control={<Checkbox />} label="Nhựa" />
          </li>
          <li>
            <FormControlLabel control={<Checkbox />} label="Kim loại" />
          </li>
          <li>
            <FormControlLabel control={<Checkbox />} label="Nhựa dẻo" />
          </li>
          <li>
            <FormControlLabel control={<Checkbox />} label="Titan" />
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default FilterSideBar;
