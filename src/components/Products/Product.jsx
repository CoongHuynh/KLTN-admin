import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  fetchFilterProduct,
  calculateScoreIncrease,
  increaseProductScore,
  fetchRecommendations,
  setPage,
} from "../../redux/slices/productSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";
import ProductCard from "./ProductCard";
import {
  ProductContainer,
  ProductGrid,
  SearchBar,
  SelectGroup,
  Pagination,
  ProductHeader,
} from "./styles";

const MainProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const { categories = [] } = useSelector((state) => state.categories) || {};
  const {
    products,
    totalPages,
    currentPage,
    loading,
    error,
    scoreIncreases,
    generalRecommendations,
  } = useSelector((state) => state.products);
  const [selectedFilter, setSelectedFilter] = useState("fetchProducts");
  useEffect(() => {
    if (selectedFilter === "fetchProducts") {
      dispatch(fetchProducts({ page: currentPage, limit: 10 }));
    } else if (selectedFilter === "fetchRecommendations") {
      dispatch(fetchRecommendations());
    }
  }, [dispatch, currentPage, selectedFilter]);

  console.log(generalRecommendations);
  useEffect(() => {
    // dispatch(calculateScoreIncrease());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleCreate = () => {
    navigate("/addproduct");
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    if (categoryId === "all") {
      dispatch(fetchProducts({ page: currentPage, limit: 10 }));
    } else {
      dispatch(
        fetchFilterProduct({
          category: categoryId,
          page: currentPage,
          limit: 10,
        })
      );
    }
  };

  return (
    <ProductContainer>
      {loading && (
        <div className="loading">
          <div></div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <ProductHeader>
        <h2>Products</h2>
        <button onClick={handleCreate}>Create new</button>
      </ProductHeader>
      <SearchBar>
        <input type="text" placeholder="Search..." />
        <SelectGroup>
          <select onChange={handleCategoryChange}>
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <select onChange={handleFilterChange}>
            <option value="fetchProducts">Latest added</option>
            <option value="fetchRecommendations">Score Increase</option>
          </select>
        </SelectGroup>
      </SearchBar>
      <ProductGrid>
        {selectedFilter === "fetchRecommendations"
          ? generalRecommendations.map((product) => (
              <ProductCard
                key={product._id}
                product={product.product}
                scoreIncrease={product.score}
              />
            ))
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </ProductGrid>
      <Pagination>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={currentPage === page + 1 ? "active" : ""}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </Pagination>
    </ProductContainer>
  );
};

export default MainProducts;
