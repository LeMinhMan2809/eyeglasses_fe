import React, { useState, useEffect } from "react";
import SideBarCat from "../components/SideBarCat";
import ProductCard from "../components/ProductCard";
import {
  listCategories,
  listProducts,
  getProductsByCategory,
} from "../utils/handleAPI";
import { Link, useParams } from "react-router-dom";

const ListingProduct = () => {
  const { categoryID } = useParams();
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    listCategories("/api/category").then((res) => {
      setCategoryData(res);
    });
  });

  useEffect(() => {
    getProductsByCategory("/api/product/category/", categoryID).then((res) => {
      setProductData(res);
      setLoading(false);
    });
  }, [categoryID]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <section className="bg-[#fbfbfb]">
      <div className="flex gap-4 ml-[70px] mr-[100px] mt-10">
        <div className="w-[8rem]">
          <SideBarCat />
        </div>

        <div className="w-full] ml-3">
          <h1 className="text-2xl font-bold mb-5">Danh sách sản phẩm</h1>
          <div className="grid grid-cols-4 gap-6">
            {productData.map((product, index) => (
              <Link to={`/product/${product._id}`} key={index}>
                <ProductCard
                  key={index}
                  name={product.name}
                  images={product.images}
                  price={product.price}
                  description={product.description}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingProduct;
