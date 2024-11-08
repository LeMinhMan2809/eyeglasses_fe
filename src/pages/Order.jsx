import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getOrderByUserID } from "../utils/orderAPI";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Order = () => {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [userID, setUserID] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUserID(res.data._id);
        console.log(res.data._id);
        getOrderByUserID(
          "/api/orders/user/" + res.data._id,
          currentPage,
          pageSize
        ).then((res) => {
          console.log(res);
          setOrders(res.orders);
          setCurrentPage(res.currentPage);
          setTotalPages(res.totalPages);
        });
      });
  }, [currentPage, pageSize]);

  return (
    <>
      {console.log(orders)}
      <div className="ml-[70px] mr-[70px] mt-8">
        <h1 className="text-2xl mb-4 text-center">Lịch sử mua hàng</h1>
        {orders?.length === 0 ? (
          <h1 className="text-xl mb-4 text-center">
            Hiện tại chưa có đơn hàng nào
          </h1>
        ) : (
          <div>
            <table className="w-full">
              <thead className="text-lg bg-gray-50 dark:bg-gray-300">
                <tr>
                  <th className="px-5 py-3 w-[18rem]">Mã đơn hàng</th>
                  <th className="px-6 py-3 w-[28rem]">Địa chỉ</th>
                  <th className="px-6 py-3 w-[10rem]">Tổng tiền</th>
                  <th className="px-6 py-3 w-[13rem]">Trạng thái</th>
                  <th className="px-6 py-3">Thanh toán</th>
                  <th className="px-6 py-3">Xem chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index} className="text-base font-medium">
                    <td className="px-5 py-3 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div>{order._id}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3">{order.address}</td>
                    <td className="px-5 py-3">
                      <div className="">
                        {order.total.toLocaleString("vi-VN")}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="border-[#c3a26a] text-base border-2 w-fit px-3 py-2 rounded-2xl">
                        {order.status === 1
                          ? "Đang chờ duyệt"
                          : "Thanh toán online"}
                      </div>
                    </td>
                    <td>
                      <div>{order.payment}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        href="#"
                        className="font-medium text-gray-600  hover:underline"
                      >
                        <Link
                          to={{
                            pathname: `/order/${order._id}`,
                            state: { orderID: order._id },
                          }}
                        >
                          Xem chi tiết
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Stack className="mt-3 items-end" spacing={2}>
              <Pagination
                shape="rounded"
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                variant="outlined"
              />
            </Stack>
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
