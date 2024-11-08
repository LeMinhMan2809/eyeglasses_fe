import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../index.css";

const SideBarCat = () => {
  return (
    <div>
      <p className="text-lg font-semibold">Màu sắc</p>
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
      </div>

      <p className="text-lg font-semibold mt-5">Chất liệu</p>
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
      </div>
    </div>
  );
};

export default SideBarCat;
