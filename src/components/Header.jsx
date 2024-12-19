import React from "react";
import { FaSearch, FaMoon, FaBell, FaStream } from "react-icons/fa";
import { FcShop } from "react-icons/fc";
import {
  HeaderContainer,
  SearchInput,
  SearchButton,
  IconContainer,
  HeaderIcon,
  ProfileIconContainer,
  Button,
  SearchContainer,
  TopHeader,
} from "./styles";

const Header = ({ toggleSidebar }) => {
  return (
    <HeaderContainer>
      {/* Thanh tìm kiếm */}
      {/* <SearchContainer>
        <SearchInput type="text" placeholder="Search term" />
        <SearchButton>
          <FaSearch />
        </SearchButton>
      </SearchContainer> */}

      <TopHeader>
        <Button onClick={toggleSidebar}>
          <FaStream />
        </Button>
        {/* Phần icon bên phải */}
        <IconContainer>
          <HeaderIcon>
            <FaMoon />
          </HeaderIcon>
          <HeaderIcon>
            <FaBell />
          </HeaderIcon>
          <span>English</span>
          <ProfileIconContainer>
            <FcShop fontSize={30} />
          </ProfileIconContainer>
        </IconContainer>
      </TopHeader>
    </HeaderContainer>
  );
};

export default Header;
