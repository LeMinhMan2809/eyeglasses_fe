import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginPic from "../assets/login_banner.png";
import { addNewUserAPI } from "../utils/handleAPI";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);

  // const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    addNewUserAPI("/api/user/register", formData).then((res) => {
      console.log(res);
      if (res.success) {
        setToken(res.token);
        localStorage.setItem("token", res.token);
        toast.success("Đăng ký thành công");
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="mt-6 ml-[8rem] mr-[8rem] flex justify-center items-center gap-2">
      <div>
        <img className="rounded-lg w-[700px] h-[448px]" src={loginPic} alt="" />
      </div>
      <div className="w-[650px] bg-[#E1D7C6] rounded-lg">
        <div>
          <p className="text-xl text-center font-bold mt-5">Đăng ký</p>
          <p className="text-lg text-center font-medium">
            Hãy đăng ký để trở thành thành viên
          </p>
        </div>
        <form onSubmit={register}>
          <div className="mx-10 mt-5">
            <p className="text-lg">Họ tên</p>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nhập tên"
              className="w-full h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>
          <div className="mx-10 mt-3">
            <p className="text-lg">Email</p>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email"
              className="w-full h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>
          <div className="mt-3 mx-10">
            <p className="text-lg">Số điện thoại</p>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="number"
              placeholder="Nhập số điện thoại"
              className="w-full h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>

          <div className="mt-3 mx-10">
            <p className="text-lg">Mật khẩu</p>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              required
              placeholder="Nhập mật khẩu"
              className="w-full h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <RemoveRedEyeIcon className="absolute right-[190px] top-[503px] cursor-pointer" />
              ) : (
                <VisibilityOffIcon className="absolute right-[190px] top-[503px] cursor-pointer" />
              )}
            </div>
          </div>

          <div className="flex mt-5 justify-center">
            <button
              type="submit"
              className="bg-[#c3a26a] text-white font-medium rounded-lg px-10 py-2"
            >
              Đăng ký
            </button>
          </div>

          <div>
            <p className="text-lg text-center font-bold mt-2 ml-10 mb-5">
              Bạn đã có tài khoản?{" "}
              <span className="underline text-[#238b7f]">
                <Link to="/login">Đăng nhập ngay</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
