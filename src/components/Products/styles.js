import styled from "styled-components";
import { Link } from "react-router-dom";
// Thẻ chứa sản phẩm
export const CardContainer = styled.div`
<<<<<<< HEAD
  position: relative;
=======
position: relative;
>>>>>>> ab0dc78f956c0940da33b05143456108ae516085
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 14em;
  background-color: #fff;
`;

// Hình ảnh sản phẩm
export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

// Tên sản phẩm
export const ProductName = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 3px;
  margin-left: 5px;
`;

// Giá sản phẩm
export const ProductPrice = styled.p`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 8px;
`;

// Nhóm các nút (Chỉnh sửa và Xóa)
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

// Nút Xóa
export const ActionButton = styled.button`
  border: ${(props) =>
    props.stylebutton === "delete" ? "1px solid #dc3545" : "1px solid #28a745"};
  color: ${(props) => (props.stylebutton === "delete" ? "#dc3545" : "#28a745")};
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: ${(props) =>
      props.stylebutton === "delete" ? "#c82333" : "#218838"};
    color: #fff;
  }
`;
/* -------------------------------  product ----------------------------------*/
export const ProductContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 97%;
  margin: auto;
`;

export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 40px;
  align-items: center;
  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 4px;
    height: 40px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
`;
// Grid sản phẩm
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

// Thanh tìm kiếm và lựa chọn
export const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 35px;
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
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

// Phân trang
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 20px;

  button {
    padding: 8px 12px;
    color: #007bff;
    border: 1px solid #007bff;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
      color: #fff;
    }
    &.active {
      background-color: #007bff;
      color: #fff;
    }
  }
`;

export const Col = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: ${(props) => (props.size ? props.size : "100%")};
  padding-right: 0.75rem;
  padding-left: 0.75rem;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  appearance: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const CardBody = styled.div`
  padding: 1.25rem;
`;

export const PaginationList = styled.ul`
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
`;

export const PaginationItem = styled.li`
  &:not(:first-child) {
    margin-left: -1px;
  }
`;

export const PaginationLink = styled(Link)`
  position: relative;
  display: block;
  padding: 0.375rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
  &:hover {
    z-index: 2;
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
  }
`;
/* -------- ---------             Add item form        ----------------------*/

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  max-height: 900px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .image-preview {
    position: relative;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }
    button {
      position: absolute;
      top: 5px;
      right: 5px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border: none;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .upload-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: 2px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;
    div {
      font-size: 24px;
      color: #888;
    }
    span {
      font-size: 14px;
      color: #888;
    }
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const AttributeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const AttributeSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const AttributeValueInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const ColorPicker = styled.div`
  display: flex;
  gap: 5px;
`;

export const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #ddd;
`;
