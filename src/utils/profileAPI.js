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
    const res = await axios.get("http://localhost:4000" + url, id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileAPI = async (id, updatedData) => {
  try {
    const res = await axios.put("http://localhost:4000" + id, updatedData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPasswordAPI = async (url, formData) => {
  try {
    const res = await axios.post("http://localhost:4000" + url, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordAPI = async (url, formData) => {
  try {
    const res = await axios.post("http://localhost:4000" + url, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
