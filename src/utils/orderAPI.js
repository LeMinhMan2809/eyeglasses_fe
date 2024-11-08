import axios from "axios";

export const getOrderByOrderID = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUserID = async (url, page, pageSize) => {
  try {
    const res = await axios.get("http://localhost:4000" + url, {
      params: {
        page,
        pageSize,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addOrderAPI = async (url, formData) => {
  try {
    const res = await axios.post("http://localhost:4000" + url, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderStatusAPI = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// OrderDetail
export const addOrderDetailAPI = async (url, formData) => {
  try {
    const res = await axios.post("http://localhost:4000" + url, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderDetailByOrderIDAPI = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
