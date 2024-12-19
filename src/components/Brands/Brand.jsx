import React, { useState, useEffect } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import {
  BrandContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  SubmitButton,
  BrandTable,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  BrandInner,
  BrandForm,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrands,
  addBrand,
  deleteBrand,
  updateBrand,
} from "../../redux/slices/brandSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import Swal from "sweetalert2";
const Brands = () => {
  const dispatch = useDispatch();
  const { brands, loading, error } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);
  const [formData, setFormData] = useState({
    name: "",
    categories: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [editBrandId, setEditBrandId] = useState(null);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      categories: selectedCategories,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateBrand({ id: editBrandId, brandData: formData }));
    } else {
      dispatch(addBrand(formData));
    }
    setFormData({ name: "", description: "", categories: [] });
    setEditMode(false);
    setEditBrandId(null);
  };

  const handleEdit = (brand) => {
    setFormData({
      name: brand.name,
      description: brand.description,
      categories: brand.categories.map((category) => category._id),
    });
    setEditMode(true);
    setEditBrandId(brand._id);
  };

  const handleDelete = (brandId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBrand(brandId));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your brand has been deleted",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    });
  };

  return (
    <BrandContainer>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <h2>Brands</h2>

      <BrandInner>
        <BrandForm as="form" onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <div className="input">
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Type here"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <FormLabel>Categories</FormLabel>
            <select
              multiple
              name="categories"
              value={formData.categories}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <SubmitButton type="submit">
              {editMode ? "Update brand" : "Create brand"}
            </SubmitButton>
          </FormGroup>
        </BrandForm>

        <BrandTable>
          <thead>
            <TableRow>
              <TableHeader></TableHeader>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Categories</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <TableRow key={brand._id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{brand._id}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  {brand.categories.map((category) => category.name).join(", ")}
                </TableCell>
                <TableCell>
                  <ActionButton
                    className="edit"
                    onClick={() => handleEdit(brand)}
                  >
                    <FaPen />
                  </ActionButton>
                  <ActionButton
                    className="delete"
                    onClick={() => handleDelete(brand._id)}
                  >
                    <FaTrashAlt />
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </BrandTable>
      </BrandInner>
    </BrandContainer>
  );
};

export default Brands;
