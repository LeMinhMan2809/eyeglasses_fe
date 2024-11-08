import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginPic from "../assets/login_banner.png";
import { userLoginAPI } from "../utils/handleAPI";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { url, token, setToken } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const Login = (e) => {
    e.preventDefault();
    userLoginAPI("/api/user/login", formData).then((res) => {
      console.log(res);
      if (res.success) {
        setToken(res.token);
        localStorage.setItem("token", res.token);
        sessionStorage.setItem("token", res.token);
        toast.success("Đăng nhập thành công");
        navigate("/");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="mt-6 ml-[8rem] mr-[8rem] flex gap-2 justify-center items-center">
      <div>
        <img className="rounded-lg w-[650px] h-[420px]" src={loginPic} alt="" />
      </div>
      <div className="w-[640px] bg-[#E1D7C6] rounded-lg">
        <div>
          <p className="text-xl text-center font-bold mt-5">Đăng nhập</p>
          <p className="text-lg text-center font-medium">
            Hãy đăng nhập để mua sắm dễ dàng hơn
          </p>
        </div>
        <form onSubmit={Login}>
          <div className="mx-10 mt-5">
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
            <p className="text-lg">Mật khẩu</p>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              required
              placeholder="Nhập mật khẩu"
              className="w-full h-10 rounded-lg text-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <RemoveRedEyeIcon className="absolute right-[190px] top-[342px] cursor-pointer" />
              ) : (
                <VisibilityOffIcon className="absolute right-[190px] top-[342px] cursor-pointer" />
              )}
            </div>
          </div>

          <div className="mt-3">
            <span className="text-lg font-bold ml-10">
              <Link to="/forgotpw">Quên mật khẩu?</Link>
            </span>
          </div>

          <div className="flex mt-5 justify-center">
            <button
              type="submit"
              className="bg-[#c3a26a] text-white font-medium rounded-lg px-10 py-2"
            >
              Đăng nhập
            </button>
          </div>

          <div className="mt-3 ml-8 flex self-center justify-center items-center">
            <div>
              <hr className="w-[50px]" />
            </div>

            <div>
              <p className="text-lg mx-4">Hoặc đăng nhập với</p>
            </div>

            <div>
              <hr className="w-[50px]" />
            </div>
          </div>

          <div>
            <p className="text-lg text-center font-bold mt-2 ml-10 mb-5">
              Bạn chưa có tài khoản?{" "}
              <span className="underline text-[#238b7f]">
                <Link to={"/register"}>Đăng ký ngay</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
