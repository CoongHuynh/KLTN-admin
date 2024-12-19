import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // Nếu không có người dùng đã đăng nhập, chuyển hướng tới trang login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Nếu có người dùng đã đăng nhập, render component con
  return <Outlet />;
};

export default ProtectedRoute;
