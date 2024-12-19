import styled from "styled-components";

// Container chính của User
export const UserContainer = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 97%;
  margin: auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 24px;
    font-weight: 500;
  }
`;

// Thanh tìm kiếm và các tùy chọn
export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 250px;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: #007bff;
    }
  }
`;

// Nhóm Select box
export const SelectGroup = styled.div`
  display: flex;
  gap: 10px;

  select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
  }
`;

// Nút tạo mới người bán
export const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Grid hiển thị danh sách người bán
export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

// Header của SellerCard
export const UserHeader = styled.div`
  background-color: #f6d9ab;
  height: 75px;
  border-radius: 8px 8px 0 0;
  position: relative;
`;

// Card người bán
export const UserCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding-bottom: 20px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// Hình ảnh người dùng
export const UserImage = styled.img`
  width: 80px;
  height: 80px;
  background-color: #fff;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

// Thông tin người bán
export const UserInfo = styled.div`
  margin-top: 40px;
`;

// Tên người bán
export const UserName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

// ID người bán
export const UserID = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
`;

// Email người bán
export const UserEmail = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
`;

// Nút profile
export const ProfileButton = styled.button`
  padding: 8px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ProfileContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  .del-user {
    display: flex;
    justify-content: flex-end;
  }
  h1 {
    margin-top: 0;
  }
  .go-back {
    background-color: #007bff;
    color: #fff;
    margin-bottom: 20px;
    &:hover {
      background-color: #0056b3;
    }
  }
  .save-btn {
    background-color: #28a745;
    color: #fff;
    &:hover {
      background-color: #218838;
    }
  }
`;
export const ProfileTop = styled.div`
  position: relative;
`;
export const ProfileInfo = styled.div`
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 3px solid #ddd;
  .detail-info {
    margin-left: 230px;
  }
    label {
    margin-right: 10px;
`;
export const Header = styled.div`
  background-color: #f6d9ab;
  height: 100px;
  border-radius: 8px 8px 0 0;
`;

export const Logo = styled.img`
  width: 150px;
  height: 150px;
  background-color: #fff;
  border-radius: 10px;
  border: 3px solid #fff;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  position: absolute;
  top: 30px;
  left: 110px;
  transform: translateX(-50%);
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const InfoBlock = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-right: 10px;
  h3 {
    margin-top: 20px;
  }
  .total-info {
    font-size: 24px;
    font-weight: bold;
    color: #4caf50;
  }
`;

export const InfoBlock2 = styled.div`
  flex: 1;
  padding: 10px;
`;

export const Button = styled.button`
  background-color: #e53935;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    background-color: #c62828;
  }
`;

// style cho input trong form
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

// style cho form tạo mới user
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }
`;
