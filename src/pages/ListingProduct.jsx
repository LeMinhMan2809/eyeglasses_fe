import React, { useState, useEffect } from "react";
import FilterSideBar from "../components/FilterSideBar";
import ProductCard from "../components/ProductCard";
import {
  listCategories,
  listProducts,
  getProductsByCategory,
  getProductsByKeyword,
} from "../utils/handleAPI";
import { Link, useParams, useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ListingProduct = () => {
  const { categoryID } = useParams();
  const [keyword, setKeyword] = useSearchParams();
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleBrandChange = (brand, isChecked) => {
    if (isChecked) {
      setSelectedBrands((prev) => [...prev, brand]); // Add the selected brand
    } else {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand)); // Remove the unselected brand
    }
  };

  useEffect(() => {
    // Filter the products based on selected brands
    if (selectedBrands.length > 0) {
      console.log(selectedBrands);
      console.log(productData);
      // const filtered = productData.filter((product) => product.brand);
      const filtered = productData.filter((product) =>
        selectedBrands.includes(product.brand?.name)
      );
      console.log(filtered);
      setFilteredProducts(filtered);
      setLoading(false);
    } else {
      setFilteredProducts(productData); // If no brands are selected, show all products
    }
  }, [selectedBrands, productData]);

  useEffect(() => {
    if (!keyword.get("keyword")) {
      getProductsByCategory("/api/product/category/", categoryID).then(
        (res) => {
          setProductData(res);
          setLoading(false);
        }
      );
    }
  }, [categoryID]);

  useEffect(() => {
    if (keyword.get("keyword")) {
      getProductsByKeyword(
        "/api/product/search?keyword=" + keyword.get("keyword")
      ).then((res) => {
        setProductData(res);
        setLoading(false);
      });
    }
  }, [keyword]);

  return (
    <div>
      {loading ? (
        <Box
          className="flex justify-center items-center mt-10"
          sx={{ display: "flex" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <section className="bg-[#fbfbfb]">
          <div className="flex gap-4 ml-[70px] mr-[100px] mt-10">
            <div className="w-[10rem]">
              <FilterSideBar handleBrandChange={handleBrandChange} />
            </div>

            <div className="w-full] ml-3">
              <h1 className="text-2xl font-bold mb-5">Danh sách sản phẩm</h1>
              <div className="grid grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
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
      )}
    </div>
  );
};

export default ListingProduct;
