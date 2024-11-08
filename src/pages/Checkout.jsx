import React, { useState, useContext, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { getAddressAPI } from "../utils/addressAPI";
import { addOrderAPI, getOrderStatusAPI } from "../utils/orderAPI";

const Checkout = () => {
  const { url } = useContext(StoreContext);
  const [cartDataList, setCartDataList] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [orderStatus, setOrderStatus] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("");

  const ls = typeof window !== "undefined" ? localStorage : null;
  const token = localStorage.getItem("token");

  const [formOrderData, setFormOrderData] = useState({
    payment: "",
    note: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUserProfile([res.data]);
        getAddressAPI("/api/address/" + res.data._id)
          .then((res) => {
            setAddressData(res);
          })
          .catch((err) => {
            console.error("Error fetching user profile:", err);
          });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartDataList(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  const onChange = (e) => {
    setFormOrderData({ ...formOrderData, [e.target.name]: e.target.value });
  };

  const handleChangeAddress = (event) => {
    setSelectedAddress(event);
  };

  const handleChangePaymentType = (event) => {
    if (event.target.value === "cod") {
      setPaymentMethod("Thanh toán khi nhận hàng");
    } else {
      setPaymentMethod("Thanh toán online");
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // if (!selectedAddress) {
    //   alert("Chưa chọn địa chỉ nhận hàng");
    //   return;
    // } else if (!paymentMethod) {
    //   alert("Chưa chọn phương thức thanh toán");
    //   return;
    // }
    // const fullAddress =
    //   selectedAddress.addressFull +
    //   " " +
    //   selectedAddress.district.dName +
    //   " " +
    //   selectedAddress.ward.name;
    // console.log(paymentMethod);
    const order = {
      user: userProfile[0]._id,
      total: cartDataList.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
      address: "sdasd",
      status: 1,
      payment: paymentMethod,
      note: formOrderData.note,
    };
    addOrderAPI("/api/order/add", order).then((res) => {
      if (res.success) {
        console.log("Thành công");
  
        // Nếu VNPay thanh toán online, điều hướng đến vnpUrl
        if (paymentMethod === 'Thanh toán online' && res.paymentUrl) {
          window.location.href = res.paymentUrl;  // Chuyển hướng đến VNPay
        } else {
          alert("Thanh toán thành công!");
          // hoặc bạn có thể làm gì đó sau khi thanh toán thành công, như hiển thị thông báo
        }
      } else {
        alert("Thanh toán thất bại");
      }
    });
  };

  return (
    <div className="ml-[100px] mr-[100px] mt-8">
      <div className="w-full">
        <div className="w-full">
          <h1 className="text-3xl font-semibold mb-4">Thanh toán</h1>
          <div>
            <p className="font-semibold text-lg mb-3">Địa chỉ nhận hàng</p>
            <div className="flex items-center">
              <div className="flex flex-col">
                {addressData.length === 0 && (
                  <div className="text-base text-red-500 font-medium flex items-center gap-3">
                    Chưa có địa chỉ giao hàng, thêm tại đây
                    <div>
                      <Link to="/profile">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                          Thêm địa chỉ
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
                {addressData.length > 0 &&
                  addressData.map((address, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="address"
                        onChange={() => handleChangeAddress(address)}
                        className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <label>
                        <div className="mb-2 w-full">
                          <div className="flex gap-4 text-base font-medium">
                            <div>{address.username}</div>
                            <div>0{address.phoneNumber}</div>
                          </div>
                          <div className="text-base font-medium ">
                            {address.addressFull} {address.city.name},{" "}
                            {address.district.dName}, {address.ward.name}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* {addressData.length > 0 && (
            <div className="mt-4 p-4 border-1">
              <h3 className="text-lg font-semibold">Địa chỉ đã chọn:</h3>
              <p>
                {addressData[selectedAddress].username}, 0
                {addressData[selectedAddress].phoneNumber},{" "}
                {addressData[selectedAddress].addressFull},{" "}
                {addressData[selectedAddress].city.name},{" "}
                {addressData[selectedAddress].district.dName},{" "}
                {addressData[selectedAddress].ward.name}
              </p>
            </div>
          )} */}

          <div className="p-5 bg-[#f3f3f3] w-full mt-3 text-lg">
            <p className="text-center pb-[3rem] font-semibold">Đơn hàng</p>

            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[20rem] text-left">Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartDataList.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b text-center border-gray-400 mb-5"
                  >
                    <td className="flex items-center">
                      <img
                        className="w-[100px] mr-5"
                        src={`${url}/images/${item.product.images}`}
                        alt=""
                      />
                      <p>{item.product.name}</p>
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      {(item.product.price * item.quantity).toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-5">
              Phí vận chuyển:
              <span className="text-lg font-medium">0</span>
            </div>
            <div className="flex justify-between mt-5">
              Tổng cộng:
              <span className="text-lg font-medium">
                {cartDataList
                  .reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                  )
                  .toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <p>Lời nhắn: </p>
            <input
              type="text"
              placeholder="Lưu ý cho cửa hàng..."
              className="p-2 border-2"
              name="note"
              value={formOrderData.note}
              onChange={onChange}
            />
          </div>

          <p className="font-semibold text-lg mt-5">Phương thức thanh toán</p>
          <div className="flex flex-col">
            <div>
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                className="mr-2"
                onChange={handleChangePaymentType}
              />
              <label htmlFor="cod">Thanh toán khi giao hàng</label>
            </div>

            <div>
              <input
                type="radio"
                id="bank"
                name="payment"
                value="bank"
                className="mr-2"
                onChange={handleChangePaymentType}
              />
              <label htmlFor="bank">Thanh toán online</label>
            </div>

            <div className="flex justify-center mt-5">
              <button
                onClick={handleCheckout}
                className="text-center px-10 py-2 bg-orange-500 rounded-md"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
