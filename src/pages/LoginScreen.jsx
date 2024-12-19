import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import {
  LoginContainer,
  ImageSection,
  FormSection,
  Form,
  Input,
  Button,
  ForgotPassword,
} from "./styles/LoginScreen";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth); // Lấy trạng thái từ Redux

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <LoginContainer>
      {/* Hình ảnh bên trái */}
      <ImageSection>
        <img
          src="https://res.cloudinary.com/dihhw7jo1/image/upload/v1728618347/banner/Side%20Image.png.png"
          alt="Login Banner"
        />
      </ImageSection>

      {/* Form đăng nhập bên phải */}
      <FormSection>
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Cập nhật state password
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Form>

        <ForgotPassword href="#">Forgot Password?</ForgotPassword>
      </FormSection>
    </LoginContainer>
  );
};

export default LoginPage;
