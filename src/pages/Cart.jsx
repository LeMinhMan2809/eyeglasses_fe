import React, { useState, useContext, useEffect, createContext } from "react";
import { StoreContext } from "../context/StoreContext";
import productImage from "../assets/HMK_glasses.png";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { url, addToCart } = useContext(StoreContext);
  // const { cartDataList, setCartDataList, updateCartData } =
  //   useContext(CartContext);
  const [cartDataList, setCartDataList] = useState([]);

  const ls = typeof window !== "undefined" ? localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartDataList(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  const updateCartData = (updatedCart) => {
    setCartDataList(updatedCart);
    // ls.setItem("cart", JSON.stringify(cartDataList)); // Update localStorage
    ls.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const onIncrease = (index) => {
    const updatedCart = [...cartDataList];
    updatedCart[index].quantity += 1;
    updateCartData(updatedCart);
  };
  const onDecrease = (index) => {
    const updatedCart = [...cartDataList];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCartData(updatedCart);
    }
  };

  const removeItemFromCart = (index) => {
    const updatedCart = [...cartDataList];
    console.log(updatedCart.splice(index, 1));
    updatedCart.splice(index, 1);
    window.location.reload();
    updateCartData(updatedCart);
  };

  return (
    <div>
      {/* {console.log(cartDataList)} */}
      <div className="ml-[90px] mr-[80px] mt-8">
        <h1 className="text-2xl mb-4">Giỏ hàng</h1>
        {cartDataList.length === 0 ? (
          <div className="flex gap-5 items-center">
            <p className="text-xl">Giỏ hàng trống</p>
            <Link to="/">
              <button className="bg-[#CDC2A5] text-black font-normal rounded-[50px] px-4 py-2">
                <p className="text-base">Tiếp tục mua hàng</p>
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-10">
            <table className="w-[80rem]">
              <thead className="text-lg bg-gray-50 dark:bg-gray-300">
                <tr>
                  <th className="px-5 py-3 w-[28rem]">Sản phẩm</th>
                  <th className="px-6 py-3">Giá</th>
                  <th className="px-6 py-3 w-[12rem]">Số lượng</th>
                  <th className="px-6 py-3">Tổng cộng</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartDataList?.map((item, index) => {
                  return (
                    <tr key={index} className="text-lg font-medium">
                      <td className="px-6 py-4 font-semibold text-gray-900 w-[30rem]">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-[100px]"
                            src={`${url}/images/${item.product.images}`}
                            alt=""
                          />
                          <div className="w-[18rem]">{item.product.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.product.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="border-[#c3a26a] border-2 w-fit px-3 py-2 rounded-2xl">
                          <button>
                            <RemoveIcon onClick={() => onDecrease(index)} />
                          </button>
                          <input
                            onChange={(e) => console.log(e.target.value)}
                            className="w-10 text-center text-black font-medium bg-transparent"
                            type="text"
                            value={item.quantity}
                          />
                          <button>
                            <AddIcon onClick={() => onIncrease(index)} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {(item.quantity * item.product.price).toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeItemFromCart(index)}
                          href="#"
                          className="font-medium text-gray-600  hover:underline"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="p-5 bg-[#f3f3f3] w-[18rem] font-semibold text-lg">
              <p className="text-center pb-[3.5rem]">Tóm tắt đơn hàng</p>
              <div className="flex items-center justify-between text-lg font-medium">
                <p>Tổng</p>
                <p>
                  {cartDataList
                    .reduce(
                      (total, item) =>
                        total + item.quantity * item.product.price,
                      0
                    )
                    .toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </p>
              </div>
              <div className="mx-auto w-full flex justify-center mt-5">
                <Link to="/checkout">
                  <button className="bg-[#CDC2A5] text-black font-normal rounded-[5rem] px-8 py-2">
                    <p className="text-base font-medium">Thanh toán</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
