import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import {
  addProduct,
  updateProduct,
  addImage,
  removeImage,
  clearImages,
  fetchProductById,
} from "../../redux/slices/productSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchBrandsByCategory } from "../../redux/slices/brandSlice";
import swl from "sweetalert2";
import {
  FormContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  ImageUploadContainer,
  FormSelect,
  SubmitButton,
  AttributeContainer,
  AttributeValueInput,
  ColorPicker,
  ColorOption,
} from "./styles"; // Import các styled-components từ file styles

const AddItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.products);
  const { categories = [] } = useSelector((state) => state.categories) || {};
  const { brands = [] } = useSelector((state) => state.brands) || {};
  const initialFormData = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    brand: "",
    attributes: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          const product = action.payload;
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category_id: product.category_id,
            brand: product.brand,
            attributes: product.attributes || [],
          });
          dispatch(clearImages());
          product.images.forEach((image) => dispatch(addImage(image)));
        }
      });
    } else {
      setFormData(initialFormData);
      dispatch(clearImages());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (formData.category_id) {
      dispatch(fetchBrandsByCategory(formData.category_id)); // Fetch brands khi chọn category
    }
  }, [dispatch, formData.category_id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => dispatch(addImage(file)));
  };

  const handleUploadBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleAttributeChange = (e, attribute) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedAttributes([...selectedAttributes, attribute]);
      setFormData({
        ...formData,
        attributes: [...formData.attributes, { name: attribute, values: [] }],
      });
    } else {
      const updatedAttributes = selectedAttributes.filter(
        (attr) => attr !== attribute
      );
      setSelectedAttributes(updatedAttributes);
      setFormData({
        ...formData,
        attributes: formData.attributes.filter(
          (attr) => attr.name !== attribute
        ),
      });
    }
  };

  const handleAttributeValueChange = (index, valueIndex, value) => {
    const updatedAttributes = [...formData.attributes];
    updatedAttributes[index].values[valueIndex] = value;
    setFormData({ ...formData, attributes: updatedAttributes });
  };

  const handleAddAttributeValue = (index) => {
    const updatedAttributes = [...formData.attributes];
    updatedAttributes[index].values.push("");
    setFormData({ ...formData, attributes: updatedAttributes });
  };

  const handleColorChange = (index, color) => {
    const updatedAttributes = [...formData.attributes];
    if (!updatedAttributes[index].values.includes(color)) {
      updatedAttributes[index].values.push(color);
    } else {
      updatedAttributes[index].values = updatedAttributes[index].values.filter(
        (c) => c !== color
      );
    }
    setFormData({ ...formData, attributes: updatedAttributes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Kiểm tra xem các trường đã được điền đầy đủ chưa
    const { name, description, price, stock, category_id, brand } = formData;
    if (!name || !description || !price || !stock || !category_id || !brand) {
      swl.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill out all required fields.",
      });
      return;
    }

    const productData = {
      ...formData,
      attributes: JSON.stringify(formData.attributes), // Chuyển đổi attributes thành chuỗi JSON
      images,
    };

    if (id) {
      dispatch(updateProduct({ id, productData })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          navigate(`/products`);
        }
      });
    } else {
      dispatch(addProduct(productData)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          navigate(`/products`);
        }
      });
    }
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      <h2>{id ? "Update product" : "Create product"}</h2>
      {id && (
        <SubmitButton onClick={() => navigate(`/products`)}>
          Back to products
        </SubmitButton>
      )}
      {/* Tên sản phẩm */}
      <FormGroup>
        <FormLabel>Product title</FormLabel>
        <FormInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Writing"
        />
      </FormGroup>

      {/* Label */}
      <FormGroup>
        <FormLabel>Label</FormLabel>
        <FormTextarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Type here"
        />
      </FormGroup>

      {/* Ảnh sản phẩm */}
      <FormGroup>
        <FormLabel>Images</FormLabel>
        <ImageUploadContainer>
          {images.map((image, index) => (
            <div key={index} className="image-preview">
              {image instanceof File || image instanceof Blob ? (
                <img src={URL.createObjectURL(image)} alt="product" />
              ) : (
                <img src={image} alt="product" />
              )}
              <button
                type="button"
                onClick={() => dispatch(removeImage(index))}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="upload-box" onClick={handleUploadBoxClick}>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div>
              <IoCloudUploadOutline />
            </div>
            <span>Upload</span>
          </div>
        </ImageUploadContainer>
      </FormGroup>

      {/* Category */}
      <FormGroup>
        <FormLabel>Category</FormLabel>
        <FormSelect
          name="category_id"
          value={formData.category_id}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      {/* Brand */}
      <FormGroup>
        <FormLabel>Brand</FormLabel>
        <FormSelect
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
        >
          <option value="">Select brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      {/* Giá sản phẩm */}
      <FormGroup>
        <FormLabel>Price</FormLabel>
        <FormInput
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Type here"
        />
      </FormGroup>

      {/* Stock */}
      <FormGroup>
        <FormLabel>Stock</FormLabel>
        <FormInput
          type="text"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="Type here"
        />
      </FormGroup>

      {/* Attributes */}
      {/* <FormGroup>
        <FormLabel>Attributes</FormLabel>
        {["color", "memory"].map((attribute) => (
          <AttributeContainer key={attribute}>
            <input
              type="checkbox"
              checked={selectedAttributes.includes(attribute)}
              onChange={(e) => handleAttributeChange(e, attribute)}
            />
            <FormLabel>{attribute}</FormLabel>
            {selectedAttributes.includes(attribute) && (
              <>
                {attribute === "color" ? (
                  <ColorPicker>
                    {[
                      "#FFFFFF",
                      "#FF4B4B",
                      "#000000",
                      "#0000FF",
                      "#00FF00",
                      "#FFFF00",
                      "#FFA500",
                      "#800080",
                      "#FFC0CB",
                      "#A52A2A",
                    ].map((color) => (
                      <ColorOption
                        key={color}
                        style={{
                          backgroundColor: color,
                          border: formData.attributes[
                            selectedAttributes.indexOf(attribute)
                          ]?.values.includes(color)
                            ? "2px solid #000"
                            : "none",
                        }}
                        onClick={() =>
                          handleColorChange(
                            selectedAttributes.indexOf(attribute),
                            color
                          )
                        }
                      />
                    ))}
                  </ColorPicker>
                ) : (
                  <>
                    {formData.attributes
                      .find((attr) => attr.name === attribute)
                      ?.values.map((value, valueIndex) => (
                        <AttributeValueInput
                          key={valueIndex}
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleAttributeValueChange(
                              selectedAttributes.indexOf(attribute),
                              valueIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Enter ${attribute} value`}
                        />
                      ))}
                    <button
                      type="button"
                      onClick={() =>
                        handleAddAttributeValue(
                          selectedAttributes.indexOf(attribute)
                        )
                      }
                    >
                      Add Value
                    </button>
                  </>
                )}
              </>
            )}
          </AttributeContainer>
        ))}
      </FormGroup> */}

      {/* Submit button */}
      <FormGroup>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Submitting..." : id ? "Update item" : "Submit item"}
        </SubmitButton>
      </FormGroup>

      {error && (
        <p>Error: {typeof error === "string" ? error : error.message}</p>
      )}
    </FormContainer>
  );
};

export default AddItemForm;
