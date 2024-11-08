import React, { useEffect, useState } from 'react';
const PayMent = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
    const urlParams = new URLSearchParams(window.location.search);
    const vnp_Amount = urlParams.get('vnp_Amount');
    const vnp_TxnRef = urlParams.get('vnp_TxnRef');
  useEffect(() => {
    if(vnp_Amount){
        setPaymentStatus(`Thanh toán thành công đơn hàng ${vnp_TxnRef} với tổng số tiền ${vnp_Amount}`)
    }
  }, []);
 
  return (
    <div>
      {paymentStatus ? (
        <p>{paymentStatus}</p>
      ) : (
        <p>Đang xử lý...</p>
      )}
    </div>
  );
}
export default PayMent;
