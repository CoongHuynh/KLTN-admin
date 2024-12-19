import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
export const SidebarContainer = styled.div`
  max-width: ${(props) => (props.isMinimized ? "60px" : "260px")};
  display: block;
  position: fixed;

  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
  background-color: #f8f9fa;
  box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.075);
  z-index: 10;
  border-right: 1px solid rgba(108, 117, 125, 0.25);
  transition: max-width 0.3s ease, left 0.3s ease;
  left: ${(props) => (props.isMobile ? "-260px" : "0")};
  @media (max-width: 768px) {
    transition: max-width 0.3s ease, left 0.3s ease;
    left: ${(props) => (props.isMobile ? "0" : "-260px")};
  }
`;
export const ContentWrapper = styled.div`
  margin-left: ${(props) => (props.isMinimized ? "80px" : "260px")};
  padding: 20px;
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
export const AsideTop = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BrandWrap = styled(Link)`
  padding: 1rem;
  display: flex;
  align-items: center;
  color: #3068e0;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: #f8f9fa;
  &:hover {
    color: #007bff;
  }
`;

export const Logo = styled.img`
  height: 46px;
`;

export const MinimizeButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  font-size: 20px;
`;
export const Button = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    background: none;
    border: none;
    color: #6c757d;
    font-size: 20px;
  }
`;
export const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
  }
`;

export const MenuItem = styled.li`
  margin-bottom: 10px;
`;

export const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isMinimized ? "center" : "flex-start")};
  color: #464a5d;
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    background-color: ;
  }
  &.active {
    background-color: #e8effd;
    color: #5475af;
    border-radius: 8px;
    i {
      color: #3068e0;
    }
  }
`;

export const Icon = styled.i`
  margin-right: ${(props) => (props.isMinimized ? "0" : "10px")};
  color: #b3b4cf;
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: ${(props) => (props.isMobile ? "block" : "none")};
`;
export const Text = styled.span`
  font-size: 16px;
`;

/* ------------- header styles ----------- */
// Header container
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 10px rgba (0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TopHeader = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
// Phần chứa thanh tìm kiếm
export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 32em;
  margin-top: 10px;

  @media (max-width: 768px) {
    max-width: 100%;
    justify-content: flex-end;
  }
`;

// Thanh tìm kiếm
export const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const SearchButton = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding: 10px;
  cursor: pointer;

  i {
    color: #007bff;
  }

  &:hover i {
    color: #0056b3;
  }
`;

// Phần icon bên phải
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  span {
    font-size: 14px;
    color: #555;
  }
`;

export const HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #555;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #007bff;
    border-color: #007bff;
  }
`;

// Phần chứa hình ảnh profile
export const ProfileIconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;

  &:hover {
    border-color: #007bff;
  }
`;
