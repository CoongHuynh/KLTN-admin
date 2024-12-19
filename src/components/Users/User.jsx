import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, fetchUsers } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import {
  UserContainer,
  UserGrid,
  UserCard,
  UserImage,
  UserInfo,
  UserName,
  UserEmail,
  UserID,
  ProfileButton,
  UserHeader,
  SearchContainer,
  SelectGroup,
  CreateButton,
} from "./styles";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleProfileClick = async (userId) => {
    try {
      await dispatch(fetchUserById(userId)).unwrap();
      navigate(`/users/${userId}`);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  return (
    <UserContainer>
      {loading && (
        <div className="loading">
          <div></div>
        </div>
      )}{" "}
      {error && <p>{error}</p>}
      <div className="header">
        <h2>User</h2>
        <CreateButton onClick={() => navigate(`/create-user`)}>
          Create new
        </CreateButton>
      </div>
      {/* Thanh tìm kiếm và lựa chọn */}
      <SearchContainer>
        <input type="text" placeholder="Search" />
        <SelectGroup>
          <select>
            <option>Show 20</option>
          </select>
          <select>
            <option>Date</option>
          </select>
        </SelectGroup>
      </SearchContainer>
      <UserGrid>
        {users.map((user, index) => (
          <UserCard key={index}>
            <UserHeader />
            <UserImage src="avatar-user.gif" alt={user.name} />
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserID>ID: {user._id}</UserID>
              <UserEmail>{user.email}</UserEmail>
              <ProfileButton onClick={() => handleProfileClick(user._id)}>
                Profile
              </ProfileButton>
            </UserInfo>
          </UserCard>
        ))}
      </UserGrid>
    </UserContainer>
  );
};

export default User;
