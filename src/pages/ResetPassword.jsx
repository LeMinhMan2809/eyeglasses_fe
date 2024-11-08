import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { resetPasswordAPI } from "../utils/profileAPI";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id, token } = useParams();
  const [passwordData, setPasswordData] = useState({
    password: "",
  });

  const handleChange = (event) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    axios
      .post(`http://localhost:4000/api/user/pw/reset-password/${id}/${token}`, {
        password: passwordData.password,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Cập nhật mật khẩu thành công");
          setIsSubmitting(false);
          navigate("/login");
        }
      });
  };

  return (
    <div className="h-[42rem] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your new password"
                name="password"
                value={passwordData.password}
                onChange={handleChange}
                className="w-full px-5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {/* <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /> */}
            </div>
            {/* {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} */}
          </div>

          <button
            type="submit"
            className="w-full text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 bg-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
            ) : (
              <>
                Change Password
                <ArrowForwardIosIcon className="h-3 w-3" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
