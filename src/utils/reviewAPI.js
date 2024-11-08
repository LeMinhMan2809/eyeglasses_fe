import axios from "axios";
export const getReviewAPI = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getReviewAPIByProductID = async (id) => {
  try {
    const res = await axios.get("http://localhost:4000" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addReviewAPI = async (url, formData) => {
  try {
    const res = await axios.post("http://localhost:4000" + url, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
