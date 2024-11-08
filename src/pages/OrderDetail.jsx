import React, { useState, useEffect } from "react";
import {
  getOrderByOrderID,
  getOrderDetailByOrderIDAPI,
} from "../utils/orderAPI";
import { useLocation, useParams } from "react-router-dom";
import { getUserProfileByIDAPI } from "../utils/profileAPI";

const OrderDetail = () => {
  const { orderID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [orderDetailData, setorderDetailData] = useState([]);

  useEffect(() => {
    getOrderByOrderID("/api/orders/order/" + orderID).then((res) => {
      setOrderData(res);
      setIsLoading(false);
      if (res[0]?.user) {
        getUserProfileByIDAPI("/api/user/" + res[0].user).then((userRes) => {
          setUserData([userRes]);
        });
      }
    });
  }, []);

  useEffect(() => {
    getOrderDetailByOrderIDAPI("/api/orderDetail/" + orderID).then((res) => {
      setorderDetailData(res);
      // console.log(res);
    });
  }, []);
  //const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <>
      <div className="ml-[70px] mr-[70px] mt-8">
        <h1 className="text-2xl mb-4 text-center">Chi tiết hóa đơn</h1>
        <div className="text-xl font-medium">
          <h1>
            Mã hóa đơn: <span>{orderID}</span>{" "}
          </h1>
        </div>

        <div className="flex gap-10 mb-8">
          <div className="bg-[#fbfbfb] rounded-lg p-5 w-[25rem] mt-5">
            <h1 className="text-xl font-medium pb-2">Thông tin</h1>
            {userData?.map((user, index) => {
              return user ? (
                <div key={index}>
                  <div className="flex">
                    <p className="w-[8rem]">Tên:</p>
                    <p>{user.name}</p>
                  </div>
                  <div className="flex">
                    <p className="w-[8rem]">Email:</p>
                    <p>{user.email}</p>
                  </div>
                  <div className="flex">
                    <p className="w-[8rem]">Số điện thoại:</p>
                    <p>{user.phone}</p>
                  </div>
                </div>
              ) : (
                <p>Đang xử lý...</p>
              );
            })}
          </div>

          <div className="bg-[#fbfbfb] rounded-lg p-5 w-[25rem] mt-5">
            <h1 className="text-xl font-medium pb-2">Thông tin vận chuyển</h1>
            {orderData?.map((order, index) => {
              return (
                <div key={index}>
                  <div className="flex">
                    <p className="w-[8rem]">Địa chỉ:</p>
                    <p>{order.address}</p>
                  </div>
                  <div className="flex">
                    <p className="w-[8rem]">Phương thức:</p>
                    <p>{order.payment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-5">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-[20rem]">Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {orderDetailData?.map((order) =>
                // Map through each product in the order
                order.products.map((product, productIndex) => (
                  <tr
                    key={`${order.id}-${productIndex}`}
                    className="border-b text-center font-medium border-gray-400 mb-5"
                  >
                    <td className="flex items-center p-4">
                      <img
                        className="w-[100px] h-[100px] object-cover mr-5"
                        src={`http://localhost:4000/images/${product.image}`}
                        alt={product.name}
                      />
                      <p>{product.name}</p>
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.price?.toLocaleString()}</td>
                    <td>
                      {(product.price * product.quantity)?.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
