import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesScreen from "./pages/CategoriesScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import ProductScreen from "./pages/productScreen";
import LoginPage from "./pages/LoginScreen";
import AddProduct from "./pages/AddProduct";
import UsersScreen from "./pages/UsersScreen";
import Sidebar from "./components/SideBar";
import Header from "./components/Header";
import { ContentWrapper } from "./components/styles";
import OrderScreen from "./pages/OrderScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderDetailScreen from "./pages/OrderDetailScreen";
import UserDetail from "./components/Users/UserDetail";
import CreateUser from "./components/Users/CreateUser";
import BrandsScreen from "./pages/BrandsScreen";
const Layout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && (
        <Sidebar
          isMobile={isSidebarVisible}
          isMinimized={isMinimized}
          toggleSidebar={toggleSidebar}
          toggleMinimize={toggleMinimize}
        />
      )}
      <ContentWrapper isMinimized={isMinimized}>
        {!isLoginPage && <Header toggleSidebar={toggleSidebar} />}
        {children}
      </ContentWrapper>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Route không cần bảo vệ */}
          <Route path="/login" element={<LoginPage />} />

          {/* Các route được bảo vệ */}
          <Route element={<ProtectedRoute />}>
            <Route path="/categories" element={<CategoriesScreen />} />
            <Route path="/brands" element={<BrandsScreen />} />
            <Route path="/products" element={<ProductScreen />} />
            <Route path="/product/edit/:id" element={<ProductEditScreen />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/users" element={<UsersScreen />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/orders" element={<OrderScreen />} />
            <Route path="/orders/:orderId" element={<OrderDetailScreen />} />
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
