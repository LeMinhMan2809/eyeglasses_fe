import axios from "axios";

export const getWish = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWishByProductID = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWishByUserID = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addWish = async (url, formData) => {
  try {
    const res = await axios.post("http://localhost:4000" + url, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeWish = async (url) => {
  try {
    const res = await axios.delete("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
