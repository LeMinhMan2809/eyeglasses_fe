import axios from "axios";

export const addNewUserAPI = async (url, formData) => {
  try {
    const res = await axios.post("http://localhost:4000" + url, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userLoginAPI = async (url, formData) => {
  try {
    const res = await axios.post("http://localhost:4000" + url, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const listCategories = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async (url, updatedData) => {
  try {
    const res = await axios.put("http://localhost:4000" + url, updatedData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (url, id) => {
  try {
    const res = await axios.delete("http://localhost:4000" + url + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addProductAPI = async (url, formData) => {
  try {
    const res = await axios.post("http://localhost:4000" + url, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const listProducts = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProducts = async (url, id) => {
  try {
    const res = await axios.delete("http://localhost:4000" + url + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductIDAPI = async (url, id) => {
  try {
    const res = await axios.get("http://localhost:4000" + url + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = async (url, id) => {
  try {
    const response = await axios.get("http://localhost:4000" + url + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductsByKeyword = async (url) => {
  try {
    const response = await axios.get("http://localhost:4000" + url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
