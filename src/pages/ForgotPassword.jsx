import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { forgotPasswordAPI, resetPasswordAPI } from "../utils/profileAPI";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailData, setEmailData] = useState({
    email: "",
  });

  const handleChange = (event) => {
    setEmailData({
      ...emailData,
      [event.target.name]: event.target.value,
    });
  };
  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(emailData);
    forgotPasswordAPI("/api/user/pw/forgot-password", emailData).then((res) => {
      console.log(res);
    });
    // setIsSubmitting(true);
  };

  return (
    <div className="h-[42rem] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-500">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={emailData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full text-white p-3 rounded-lg flex items-center justify-center gap-2 bg-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
            ) : (
              <>
                Reset Password
                <ArrowForwardIosIcon className="h-3 w-3" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
