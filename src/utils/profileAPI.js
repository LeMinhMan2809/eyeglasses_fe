import axios from "axios";
export const getUserProfileAPI = async (url) => {
  try {
    const res = await axios.get("http://localhost:4000" + url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfileByIDAPI = async (url, id) => {
  try {
    const res = await axios.get("http://localhost:4000" + url + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileAPI = async (url, updatedData) => {
  try {
    const res = await axios.put("http://localhost:4000" + url, updatedData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
