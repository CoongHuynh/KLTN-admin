import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { login } from "../../redux/slices/authSlice";
import { createUserAdmin } from "../../redux/slices/userSlice";

import {
  ProfileContainer,
  Header,
  InfoSection,
  InfoBlock,
  InfoBlock2,
  Button,
  Logo,
  ProfileTop,
  ProfileInfo,
  Input,
  Form,
  CheckboxLabel,
} from "./styles";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "Huynh123@",
    phone: "",
    gender: "male",
    address: {
      street: "",
      city: "",
    },
    verified: true,
    isAdmin: false,
  });

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setUser({ ...user, [name]: checked });
    } else {
      const nameParts = name.split(".");
      if (nameParts.length > 1) {
        setUser((prevUser) => ({
          ...prevUser,
          address: {
            ...prevUser.address,
            [nameParts[1]]: value,
          },
        }));
      } else {
        setUser({ ...user, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, phone, address, isAdmin, password, gender } = user;
      const { street, city } = address;

      // Kiểm tra các trường bắt buộc
      if (
        !name ||
        !email ||
        !phone ||
        !street ||
        !city ||
        !password ||
        !gender
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill out all required fields",
        });
        return;
      }

      await dispatch(createUserAdmin(user)).unwrap();
      navigate(`/users`);
    } catch (error) {
      console.error("Failed to create user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to create user",
      });
    }
  };

  const { name, email, phone, address, isAdmin, password, gender } = user;
  const { street, city } = address;

  return (
    <ProfileContainer>
      <Button className="go-back" onClick={() => navigate(`/users`)}>
        Go Back
      </Button>{" "}
      <Form onSubmit={handleSubmit}>
        <ProfileTop>
          <Header />
          <Logo src="avatar-user.gif" alt="Seller Logo" />
          <ProfileInfo>
            <div className="detail-info">
              <h2>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </h2>
              <p>
                <Input
                  type="text"
                  name="address.street"
                  value={street}
                  onChange={handleChange}
                  placeholder="Street"
                />
                <Input
                  type="text"
                  name="address.city"
                  value={city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </p>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={handleChange}
                />
                Is Admin
              </CheckboxLabel>
            </div>
          </ProfileInfo>
        </ProfileTop>
        <InfoSection>
          <InfoBlock>
            <h3>Total Order</h3>
            <p className="total-info">0</p>
            <h3>Total Paid</h3>
            <p className="total-info">$0</p>
          </InfoBlock>
          <InfoBlock2>
            <h3>Contacts</h3>
            <p>
              Full Name:{" "}
              <Input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </p>
            <p>
              Email:{" "}
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
              />
            </p>
            <p>
              Phone:{" "}
              <Input
                type="text"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </p>
            <p>
              Password:{" "}
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
            </p>
            <p>
              Gender:{" "}
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </p>
          </InfoBlock2>
          <InfoBlock2>
            <h3>Address</h3>

            <p>
              <Input
                type="text"
                name="address.street"
                value={street}
                onChange={handleChange}
                placeholder="Street"
              />
              <Input
                type="text"
                name="address.city"
                value={city}
                onChange={handleChange}
                placeholder="City"
              />
            </p>
          </InfoBlock2>
        </InfoSection>
        <div className="del-user">
          <Button type="submit" className="save-btn">
            Submit
          </Button>
        </div>
      </Form>
    </ProfileContainer>
  );
};

export default CreateUser;
