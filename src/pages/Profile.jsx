import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addAddressAPI,
  deleteAddressAPI,
  getAddressAPI,
  getCityAPI,
  getDistrictAPI,
  getWardAPI,
} from "../utils/addressAPI";
import { getUserProfileAPI, updateProfileAPI } from "../utils/profileAPI";

const Profile = () => {
  const { url } = useContext(StoreContext);
  const token = localStorage.getItem("token");

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [addressData, setAddressData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [userID, setUserID] = useState("");
  const [selectedImage, setSelectedImage] = useState(userProfile.image);
  const [updatedImage, setUpdatedImage] = useState("");

  useEffect(() => {
    getCityAPI("/api/city/cities")
      .then((res) => {
        setCities(res);
      })
      .catch((err) => {
        console.error("Error fetching cities:", err);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [formAddressData, setFormAddressData] = useState({
    user: "",
    username: "",
    phoneNumber: "",
    addressFull: "",
    city: "",
    district: "",
    ward: "",
  });

  const onChangeAddress = (e) => {
    setFormAddressData({ ...formAddressData, [e.target.name]: e.target.value });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeCity = (id) => {
    setCity(id);
    if (id === "-1") {
      setDistricts([]);
      setWards([]);
      return;
    }
    getDistrictAPI("/api/district/" + id).then((res) => {
      const sortedDistricts = res.sort((a, b) =>
        a.dName.localeCompare(b.dName)
      );
      setDistricts(sortedDistricts);
    });
  };

  const onChangeDistrict = (id) => {
    setDistrict(id);
    if (id === -1) {
      setWards([]);
      return;
    }
    getWardAPI("/api/ward/" + id).then((res) => {
      setWards(res);
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUserProfile([res.data]);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
        setUserID(res.data._id);
        getAddressAPI("/api/address/" + res.data._id)
          .then((res) => {
            setAddressData(res);
          })
          .catch((err) => {
            console.error("Error fetching user profile:", err);
          });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
    // axios.get("http://localhost:4000/api/user/").then((res) => {
    //   setUserProfile(res.data);
    // });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update the avatar with the new image
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
    setUpdatedImage(event.target.files[0]);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (e) => {
    e.preventDefault();
    const form = {
      user: userProfile[0]._id,
      username: formAddressData.username,
      phoneNumber: formAddressData.phoneNumber,
      addressFull: formAddressData.addressFull,
      city: city,
      district: district,
      ward: ward,
    };

    addAddressAPI("/api/address/add", form).then((res) => {
      if (res.success) {
        axios
          .get("http://localhost:4000/api/user/profile", {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setUserProfile([res.data]);
            getAddressAPI("/api/address/" + res.data._id).then((res) => {
              setAddressData(res);
            });
          });
        toast.success("Thêm địa chỉ thành công");
        setIsModalOpen(false);
      }
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log(updatedImage);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("image", updatedImage);
    console.log(formDataToSend);
    updateProfileAPI("/api/user/" + userID, formDataToSend).then((res) => {
      if (res.success) {
        toast.success("Cập nhật thành công");
        window.location.reload();
      }
    });
  };

  const deleteAddress = async (id) => {
    deleteAddressAPI("/api/address/" + id).then((res) => {
      if (res.success) {
        toast.success("Xóa địa chỉ thành công");
        axios
          .get("http://localhost:4000/api/user/profile", {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            console.log(res);
            setUserProfile([res.data]);
            getAddressAPI("/api/address/" + res.data._id).then((res) => {
              setAddressData(res);
            });
          });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {userProfile.map((profile) => {
        return (
          <div key={profile._id}>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <img
                  src={selectedImage || url + "/images/" + profile.image}
                  alt=""
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                />

                <label
                  htmlFor="image"
                  className="absolute top-[16rem] right-[43.5rem] p-2 bg-white rounded-full cursor-pointer"
                >
                  <ModeEditOutlineIcon fontSize="medium" color="info" />
                </label>

                <input
                  id="image"
                  className="hidden"
                  name="image"
                  type="file"
                  onChange={handleImageUpload}
                />
              </div>

              <h2 className="mt-4 text-2xl font-bold">{profile.name}</h2>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-500 mb-2">Tên người dùng</p>
                  <input
                    className="border-2 p-2 font-medium rounded-lg"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <p className="text-base text-gray-500">Email address</p>
                  <input
                    className="border-2 p-2 font-medium w-full rounded-lg"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <p className="text-base text-gray-500">Số điện thoại</p>
                  <input
                    className="border-2 p-2 font-medium rounded-lg"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                  />
                </div>
              </div>
              <Button
                onClick={updateProfile}
                className="font-semibold mt-5"
                type="primary"
              >
                Cập nhật
              </Button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-4">Address</h3>
                <div>
                  <Button
                    className="font-semibold"
                    type="primary"
                    onClick={showModal}
                  >
                    Thêm địa chỉ
                  </Button>
                  <Modal
                    title="Thêm địa chỉ"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <div className="max-w-lg mx-auto rounded-md">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-gray-700 mb-2"
                        >
                          Tên của bạn
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Tên của bạn"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          name="username"
                          value={formAddressData.username}
                          onChange={onChangeAddress}
                        />
                      </div>

                      <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                          <label
                            htmlFor="phone"
                            className="block text-gray-700 mb-2"
                          >
                            Số điện thoại
                          </label>
                          <input
                            id="phone"
                            type="text"
                            placeholder="Số điện thoại"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="phoneNumber"
                            value={formAddressData.phoneNumber}
                            onChange={onChangeAddress}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="address"
                          className="block text-gray-700 mb-2"
                        >
                          Số nhà và tên đường
                        </label>
                        <input
                          id="address"
                          type="text"
                          placeholder="Số nhà và tên đường"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          name="addressFull"
                          value={formAddressData.addressFull}
                          onChange={onChangeAddress}
                        />
                      </div>

                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label
                            htmlFor="city"
                            className="block text-gray-700 mb-2"
                          >
                            Tỉnh thành
                          </label>
                          <select
                            id="city"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => onChangeCity(e.target.value)}
                          >
                            <option selected="selected" value={-1}>
                              Chọn tỉnh thành
                            </option>
                            {cities.length > 0 &&
                              cities.map((city, index) => (
                                <>
                                  <option key={index} value={city._id}>
                                    {city.name}
                                  </option>
                                </>
                              ))}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="district"
                            className="block text-gray-700 mb-2"
                          >
                            Chọn Quận/Huyện
                          </label>
                          <select
                            id="district"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => onChangeDistrict(e.target.value)}
                          >
                            <option selected="selected" value={-1}>
                              Chọn quận/huyện
                            </option>
                            {districts.length > 0 &&
                              districts.map((district, index) => (
                                <option key={index} value={district._id}>
                                  {district.dName}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="ward"
                            className="block text-gray-700 mb-2"
                          >
                            Chọn Phường/Xã
                          </label>
                          <select
                            id="ward"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setWard(e.target.value)}
                          >
                            <option selected="selected" value={-1}>
                              Chọn phường/xã
                            </option>
                            {wards.length > 0 &&
                              wards.map((ward, index) => (
                                <option key={index} value={ward._id}>
                                  {ward.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
              <div className="flex flex-col">
                {addressData.length === 0 && (
                  <div className="text-base text-red-500 font-medium">
                    Vui lòng thêm địa chỉ giao hàng
                  </div>
                )}
                {addressData.length > 0 &&
                  addressData.map((address, index) => (
                    <div
                      className="mb-2 w-full flex items-center justify-between"
                      key={index}
                    >
                      <div>
                        <div className="flex gap-4 text-base font-medium">
                          <div>{address.username}</div>
                          <div>0{address.phoneNumber}</div>
                        </div>
                        <div className="text-base font-medium ">
                          {address.addressFull} {address.city.name},{" "}
                          {address.district.dName}, {address.ward.name}
                        </div>
                      </div>

                      <button
                        onClick={() => deleteAddress(address._id)}
                        type="button"
                        className="bg-red-500 hover:bg-red-900 text-white font-medium py-1 px-3 rounded"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
