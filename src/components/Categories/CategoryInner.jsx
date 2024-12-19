import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import {
  CategoryInner,
  CategoryForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  SubmitButton,
  CategoryTable,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
} from "./styles";

const CategoryInnerComponent = ({
  formData,
  setFormData,
  handleInputChange,
  handleBrandChange,
  handleCategoryChange,
  handleSubmit,
  handleEdit,
  handleDelete,
  editMode,
  categories,
  brands,
  isBrand = false,
}) => {
  return (
    <CategoryInner>
      <CategoryForm as="form" onSubmit={handleSubmit}>
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
          <FormLabel>Description</FormLabel>
          <FormTextarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Type here"
          />
        </FormGroup>

        {isBrand ? (
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
        ) : (
          <FormGroup>
            <FormLabel>Brands</FormLabel>
            <select
              multiple
              name="brands"
              value={formData.brands}
              onChange={handleBrandChange}
            >
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </FormGroup>
        )}

        <FormGroup>
          <SubmitButton type="submit">
            {editMode
              ? isBrand
                ? "Update brand"
                : "Update category"
              : isBrand
              ? "Create brand"
              : "Create category"}
          </SubmitButton>
        </FormGroup>
      </CategoryForm>

      <CategoryTable>
        <thead>
          <TableRow>
            <TableHeader></TableHeader>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Description</TableHeader>
            {isBrand ? (
              <TableHeader>Categories</TableHeader>
            ) : (
              <TableHeader>Brands</TableHeader>
            )}
            <TableHeader>Action</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {isBrand
            ? brands.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>{brand._id}</TableCell>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>{brand.description}</TableCell>
                  <TableCell>
                    {brand.categories
                      .map((category) => category.name)
                      .join(", ")}
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
              ))
            : categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>{category._id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    {category.brands.map((brand) => brand.name).join(", ")}
                  </TableCell>
                  <TableCell>
                    <ActionButton
                      className="edit"
                      onClick={() => handleEdit(category)}
                    >
                      <FaPen />
                    </ActionButton>
                    <ActionButton
                      className="delete"
                      onClick={() => handleDelete(category._id)}
                    >
                      <FaTrashAlt />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
        </tbody>
      </CategoryTable>
    </CategoryInner>
  );
};

export default CategoryInnerComponent;
