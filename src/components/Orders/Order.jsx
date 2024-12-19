import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import { OrderContainer, SearchBar, SelectGroup } from "./styles";
import TableOrder from "../Home/TableOrder";

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);


  return (
    <OrderContainer>
      {loading && (
        <div className="loading">
          <div></div>
        </div>
      )}
      {error && <p>{error}</p>}
      <h2>Order</h2>
      <SearchBar>
        <input type="text" placeholder="Search..." />
        <SelectGroup>
          <select>
            <option>All categories</option>
            <option>All categories</option>
            <option>All categories</option>
            <option>All categories</option>
          </select>
          <select>
            <option>Latest added</option>
            <option>Latest added</option>
            <option>Latest added</option>
            <option>Latest added</option>
          </select>
        </SelectGroup>
      </SearchBar>
      <TableOrder orders={orders} status={true} />
    </OrderContainer>
  );
};

export default Order;
