import React, { useState, useEffect } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { CategoryContainer, HeaderInner, HeaderItem } from "./styles";

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";
import {
  fetchBrands,
  addBrand,
  deleteBrand,
  updateBrand,
} from "../../redux/slices/brandSlice";
import CategoryInner from "./CategoryInner";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const { brands } = useSelector((state) => state.brands);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brands: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("category");

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleBrandChange = (e) => {
    const selectedBrands = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      brands: selectedBrands,
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
      if (activeTab === "category") {
        dispatch(updateCategory({ id: editId, categoryData: formData }));
      } else {
        dispatch(updateBrand({ id: editId, brandData: formData }));
      }
    } else {
      if (activeTab === "category") {
        dispatch(addCategory(formData));
      } else {
        dispatch(addBrand(formData));
      }
    }
    setFormData({ name: "", description: "", brands: [] });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (item) => {
    if (activeTab === "category") {
      setFormData({
        name: item.name,
        description: item.description,
        brands: item.brands.map((brand) => brand._id),
      });
    } else {
      setFormData({
        name: item.name,
        description: item.description,
        categories: item.categories.map((category) => category._id),
      });
    }
    setEditMode(true);
    setEditId(item._id);
  };

  const handleDelete = (itemId) => {
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
        if (activeTab === "category") {
          dispatch(deleteCategory(itemId));
        } else {
          dispatch(deleteBrand(itemId));
        }
        Swal.fire("Deleted!", "Your item has been deleted.");
      }
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormData({ name: "", description: "", brands: [] });
    setEditMode(false);
    setEditId(null);
  };

  return (
    <CategoryContainer>
      {loading && (
        <div className="loading">
          <div></div>
        </div>
      )}
      {error && <p>{error}</p>}

      <HeaderInner>
        <HeaderItem
          className={activeTab === "category" ? "active" : ""}
          onClick={() => handleTabClick("category")}
        >
          Category
        </HeaderItem>
        <HeaderItem
          className={activeTab === "brand" ? "active" : ""}
          onClick={() => handleTabClick("brand")}
        >
          Brand
        </HeaderItem>
      </HeaderInner>

      {activeTab === "category" && (
        <CategoryInner
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleBrandChange={handleBrandChange}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          editMode={editMode}
          categories={categories}
          brands={brands}
        />
      )}

      {activeTab === "brand" && (
        <CategoryInner
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleCategoryChange={handleCategoryChange}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          editMode={editMode}
          categories={categories}
          brands={brands}
          isBrand={true}
        />
      )}
    </CategoryContainer>
  );
};

export default Categories;
