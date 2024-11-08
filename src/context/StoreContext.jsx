import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [cartData, setCartData] = useState([]);
  const ls = typeof window !== "undefined" ? localStorage : null;

  useEffect(() => {
    if (cartData?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartData));
    }
  }, [cartData]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartData(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addToCart(data, quantity) {
    let updatedCart = [...cartData];
    // console.log(updatedCart);
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === data._id
    );
    if (productIndex !== -1) {
      // If product is already in the cart, update its quantity
      updatedCart[productIndex].quantity += quantity;
    } else {
      // If product is not in the cart, add it
      updatedCart.push({ product: data, quantity });
    }
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  const updateCartData = (updatedCart) => {};

  const contextValue = {
    url,
    token,
    setToken,
    isFocused,
    setIsFocused,
    cartData,
    setCartData,
    addToCart,
  };

  return (
    <div>
      <StoreContext.Provider value={contextValue}>
        {props.children}
      </StoreContext.Provider>
    </div>
  );
};

export default StoreContextProvider;
