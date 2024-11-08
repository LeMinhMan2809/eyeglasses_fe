import React, { useEffect, useState } from "react";
import thankyou from "../assets/Thanks.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const PayMent = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const vnp_Amount = urlParams.get("vnp_Amount");
  const vnp_TxnRef = urlParams.get("vnp_TxnRef");
  useEffect(() => {
    if (vnp_Amount) {
      setPaymentStatus(
        `Thanh toán thành công đơn hàng ${vnp_TxnRef} với tổng số tiền ${vnp_Amount.toLocaleString(
          "vi-VN"
        )}`
      );
    }
  }, []);

  return (
    <div>
      {paymentStatus ? (
        <div className="mb-[18.9rem]">
          <div className="flex justify-center mt-5">
            <img className="w-10" src={thankyou} />
          </div>
          <div>
            <p className="text-center text-2xl font-semibold text-green-500">
              Thanh toán thành công
            </p>
          </div>
        </div>
      ) : (
        <>
          <Box
            className="flex justify-center items-center mt-10"
            sx={{ display: "flex" }}
          >
            <CircularProgress />
          </Box>
          <p className="text-center text-xl mt-5">Đang xử lý...</p>
        </>
      )}
    </div>
  );
};
export default PayMent;
