import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const clearCartOnClose = () => {
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("cart");
  //   };

  //   window.addEventListener("beforeunload", clearCartOnClose);

  //   return () => {
  //     window.removeEventListener("beforeunload", clearCartOnClose);
  //   };
  // }, []);

  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default App;
