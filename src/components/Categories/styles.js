import styled from "styled-components";

// Container chính cho danh mục
export const CategoryContainer = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  //   max-width: 1200px;
  max-width: 95%;
  margin: auto;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 500;
  }
`;
export const CategoryForm = styled.div`
  width: 30%;
  margin-bottom: 40px;
  margin: 0 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CategoryInner = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    display: block;
  }
`;
// Group từng phần trong form
export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

// Label cho form
export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`;

// Input cơ bản
export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #007bff;
  }
`;

// Textarea
export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  height: 80px;
  resize: none;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #007bff;
  }
`;

// File input cho ảnh
export const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
`;

// Nút submit
export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

// Bảng danh mục
export const CategoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 20px;
  background-color: #fff;
  text-align: left;
`;

// Dòng tiêu đề bảng
export const TableHeader = styled.th`
  padding: 10px;
  border-bottom: 2px solid #ddd;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

// Dòng của bảng
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

// Ô trong bảng
export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  .edit {
    color: #007bff;
  }
  .delete {
    color: #dc3545;
  }
`;

// Nút hành động
export const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    background-color: #e0e0e0;
  }
`;
export const HeaderInner = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  h4 {
    margin-bottom: 7px;
  }
  .active {
    border-bottom: 2px solid red;
    font-weight: bold;
    color: red;
    transition: all 0.3s ease-in-out;
  }
`;

export const HeaderItem = styled.h4`
  padding: 5px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
`;
