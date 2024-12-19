import styled from "styled-components";

// Container chứa toàn bộ giao diện
export const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

// Phần hình ảnh bên trái
export const ImageSection = styled.div`
  flex: 1;
  background-color: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Phần form đăng nhập bên phải
export const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;

  h2 {
    font-size: 28px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #777;
    margin-bottom: 30px;
  }
`;

// Form nhập thông tin đăng nhập
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Input form
export const Input = styled.input`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #333;
  }
`;

// Nút đăng nhập
export const Button = styled.button`
  padding: 15px;
  font-size: 16px;
  color: #fff;
  background-color: #e94560;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d83450;
  }
`;

// Quên mật khẩu
export const ForgotPassword = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: #e94560;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
