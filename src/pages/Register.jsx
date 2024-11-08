import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import loginPic from "../assets/login_banner.png";
import { addNewUserAPI } from "../utils/handleAPI";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { token, setToken } = useContext(StoreContext);
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
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="mt-6 ml-[9rem] mr-[8rem] flex justify-center items-center gap-2">
      <div>
        <img className="rounded-lg w-[670px] h-[448px]" src={loginPic} alt="" />
      </div>
      <div className="w-[650px] bg-stone-400 rounded-lg">
        <div>
          <p className="text-xl text-center font-bold mt-3">Đăng ký</p>
          <p className="text-lg text-center font-medium">
            Hãy đăng ký để trở thành thành viên
          </p>
        </div>
        <form onSubmit={register}>
          <div className="ml-10 mt-5">
            <p className="text-lg">Họ tên</p>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Nhập tên"
              className="w-[500px] h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>
          <div className="ml-10 mt-3">
            <p className="text-lg">Email</p>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email"
              className="w-[500px] h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>
          <div className="mt-3 ml-10">
            <p className="text-lg">Số điện thoại</p>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="number"
              placeholder="Nhập số điện thoại"
              className="w-[500px] h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>

          <div className="mt-3 ml-10">
            <p className="text-lg">MẬT KHẨU</p>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-[500px] h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
            <div>
              <RemoveRedEyeIcon className="absolute right-[220px] top-[500px] cursor-pointer" />
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
            <p className="text-lg font-bold mt-2 ml-10">Quên mật khẩu?</p>
          </div>

          <div></div>

          <div>
            <p className="text-lg text-center font-bold mt-2 ml-10">
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
