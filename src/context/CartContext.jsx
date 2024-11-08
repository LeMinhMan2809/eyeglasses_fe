import { createContext, useEffect, useState } from "react";

export const CartContext = createContext("");

const CartContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [cartDataList, setCartDataList] = useState([]);
  const ls = typeof window !== "undefined" ? localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartDataList(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartDataList));
    }
  }, [cartDataList]);

  const updateCartData = (updatedCart) => {
    setCartDataList(updatedCart);
  };

  // Get total quantity of items in the cart

  const contextValue = {
    cartDataList,
    setCartDataList,
    updateCartData,
  };

  return (
    <div>
      <StoreContext.Provider value={contextValue}>
        {props.children}
      </StoreContext.Provider>
    </div>
  );
};

export default CartContextProvider;
