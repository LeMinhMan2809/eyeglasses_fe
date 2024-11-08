import React from "react";
import logo_w from "../assets/logo_w.png";
import fb_icon from "../assets/icon/fb.png";
import ig_icon from "../assets/icon/instagram.png";
import github_icon from "../assets/icon/github.png";
const Footer = () => {
  return (
    <div className="bg-[#CDC2A5] text-white pt-10 mt-10">
      <div className="ml-[100px] mr-[100px] pb-4">
        <div className="flex justify-between">
          <div>
            <img src={logo_w} className="w-[9rem] h-9" alt="" />
            <p className="mb-2 mt-3 ml-2">Bạn muốn góp ý?</p>
            <button className="bg-white text-black font-medium rounded-[50px] px-4 py-2">
              ĐÓNG GÓP Ý KIẾN
            </button>
          </div>

          <div>
            <p className="mb-5">
              <span className="font-bold">Sản phẩm</span>
            </p>
            <ul>
              <li className="mb-2">Tròng kính</li>
              <li className="mb-2">Gọng kính</li>
              <li className="mb-2">Kính râm</li>
              <li className="mb-2">Kính áp tròng</li>
              <li className="mb-2"></li>
            </ul>
          </div>
          <div>
            <p className="mb-5 font-bold">Chính sách</p>
            <ul>
              <li className="mb-2">Chính sách bảo mật</li>
              <li className="mb-2">Chính sách giao hàng</li>
              <li className="mb-2"> Chính sách thanh toán</li>
              <li className="mb-2">Chính sách bảo hành</li>
            </ul>
          </div>
          <div>
            <p className="mb-5 font-bold">Liên hệ</p>
            <ul>
              <li className="mb-2">0123456678</li>
              <li className="mb-2">manb2003791@student.ctu.edu.vn</li>
            </ul>
            <div className="flex">
              <a href="https://www.facebook.com/profile.php?id=100008333778164">
                <img className="h-8 w-8 mr-3" src={fb_icon} alt="" />
              </a>
              <a href="">
                <img className="h-8 w-8 mr-3" src={ig_icon} alt="" />
              </a>
              <a href="">
                <img className="h-8 w-8" src={github_icon} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
