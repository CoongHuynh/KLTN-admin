import styled from "styled-components";
// Container chứa toàn bộ đơn hàng
export const OrderContainer = styled.div`
  position: relative;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 97%;
  margin: auto;
`;

// Thanh tìm kiếm và lựa chọn
export const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 300px;
  }
`;

// Nhóm Select box
export const SelectGroup = styled.div`
  display: flex;

  gap: 10px;
  select {
    width: 200px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;
// Container chứa từng đơn hàng
export const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  .back-order-list-btn {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
    background-color: #007bff;

    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    &:hover {
      background-color: #0056b3;
    }
    a {
      text-decoration: none;
      color: #fff;
    }
  }
`;
// Header của từng đơn hàng
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 15px;
  margin-bottom: 20px;
  h2 {
    margin: 0;
    color: #333;
  }
  span {
    color: #999;
    font-size: 14px;
  }
  h5 {
    margin: 0 10px;
  }
  .date {
    display: flex;
  }
`;
// Section chứa thông tin khách hàng và giao hàng
export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
  }

  h3 {
    color: #555;
  }
  p {
    color: #666;
    margin: 5px 0;
  }
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .address-info {
    margin: 0 30px;
  }
`;
// Cột chứa thông tin khách hàng và giao hàng
export const OrderDetailCol = styled.div`
  flex: 1;
  display: flex;
  max-width: 33.3333%;
  margin: 20px;
  .box-content {
    margin-left: 20px;
  }
  h3 {
    margin-top: 0;
  }
`;
// Box chứa icon
export const OrderBox = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c3e6cb;
  padding: 20px;
  border-radius: 50%;
  background-color: #d1e7dd;
`;

//Cột của từng thông tin khách hàng và giao hàng
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  .table-data {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
`;
//Tên cột trong bảng
export const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  color: #333;
  border-bottom: 1px solid #ddd;
`;
// Box chứa thông tin giao hàng
export const OrderSummary = styled.table`
  margin-top: 20px;
  .payment {
    background-color: #d4edda;
    color: #155724;
    text-align: center;
    border-radius: 20px;
    margin-top: 20px;
    font-weight: bold;
    width: fit-content;
    &:hover {
      background-color: #c3e6cb;
    }
  }
  .price {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin-left: 20px;
  }
  .price-info {
    color: #555;
  }
`;
// Bảng chứa thông tin giá tổng sản phẩm + ship
export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 25px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;
//Input ghi chú
export const NoteInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  box-sizing: border-box;
`;
