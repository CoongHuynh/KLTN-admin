import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderById,
  updatePostOffice,
  updateOrderItems,
  updateOrderStatus,
} from "../../redux/slices/orderSlice";
import { IoIosCalendar } from "react-icons/io";
import { FaUser, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import {
  Container,
  Header,
  Section,
  ProductTable,
  TableHeader,
  TableRow,
  Button,
  OrderBox,
  OrderDetailCol,
  OrderSummary,
  SelectGroup,
} from "./styles";
import MapComponent from "./MapComponent";
import axios from "axios";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFpdGhpaGlldSIsImEiOiJjbTJ4eTU2YjMwYThxMmpvOGhoZW1oaHh2In0.F3GI89PsdNEEjlk9Q2o8TQ";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.order);
  const loading = useSelector((state) => state.orders.loading);
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "");
  const [shippingCoordinates, setShippingCoordinates] = useState(null);
  const [postOfficeCoordinates, setPostOfficeCoordinates] = useState(null);
  const [postOffice, setPostOffice] = useState("");
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (order) {
      setPostOffice(order.post_office || "");
    }
  }, [order]);

  useEffect(() => {
    if (order && order.shipping_address) {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              order.shipping_address
            )}.json?access_token=${MAPBOX_TOKEN}`
          );
          const coordinates = response.data.features[0]?.center;
          if (coordinates) {
            setShippingCoordinates(coordinates.join(","));
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      };

      fetchCoordinates();
    }
  }, [order]);

  useEffect(() => {
    if (postOffice) {
      const fetchPostOfficeCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              postOffice
            )}.json?access_token=${MAPBOX_TOKEN}`
          );
          const coordinates = response.data.features[0]?.center;
          if (coordinates) {
            setPostOfficeCoordinates(coordinates.join(","));
          }
        } catch (error) {
          console.error("Error fetching post office coordinates:", error);
        }
      };

      fetchPostOfficeCoordinates();
    }
  }, [postOffice]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handlePostOfficeSelect = (selectedPostOffice) => {
    setPostOffice(selectedPostOffice);
  };

  const handleSave = async () => {
    try {
      // Update post office
      await dispatch(
        updatePostOffice({ id: orderId, post_office: postOffice })
      );

      // Update order details
      //   await dispatch(updateOrderItems({ id: orderId, status: selectedStatus }));
      await dispatch(
        updateOrderStatus({ id: orderId, status: selectedStatus })
      );

      // Fetch updated order details
      dispatch(fetchOrderById(orderId));
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <Container>
      {!order && <p>No order found</p>}
      {loading && (
        <div className="loading">
          <div></div>
        </div>
      )}
      <Button onClick={() => navigate(`/orders`)}>Go Back</Button>
      <Header>
        <div>
          <div className="date">
            <IoIosCalendar />
            <h5>{new Date(order.createdAt).toLocaleString()}</h5>
          </div>
          <span>#ID {order._id}</span>
        </div>
        <SelectGroup>
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="awaiting_payment">Awaiting payment</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Button onClick={handleSave}>Save</Button>
        </SelectGroup>
      </Header>
      <Section>
        <OrderDetailCol>
          <OrderBox>
            <FaUser style={{ color: "#0F5132", fontSize: "25px" }} />
          </OrderBox>
          <div className="box-content">
            <h3>Customer</h3>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <a href="#">View profile</a>
          </div>
        </OrderDetailCol>
        <OrderDetailCol>
          <OrderBox>
            <FaTruck style={{ color: "#0F5132", fontSize: "27px" }} />
          </OrderBox>
          <div className="box-content">
            <h3>Shipping</h3>
            <p>Address: {order.shipping_address}</p>
            <p>Payment status: {order.payment_status}</p>
            <p>
              Status: <span style={{ color: "#d9534f" }}>{order.status}</span>
            </p>
          </div>
        </OrderDetailCol>
        <OrderDetailCol>
          {selectedStatus === "processing" &&
            shippingCoordinates &&
            postOfficeCoordinates && (
              <div>
                <h4>Select Shipping Address</h4>
                <MapComponent
                  start={postOfficeCoordinates}
                  end={shippingCoordinates}
                  onPostOfficeSelect={handlePostOfficeSelect}
                />
              </div>
            )}
        </OrderDetailCol>
      </Section>
      <Section>
        <ProductTable>
          <thead>
            <TableRow>
              <TableHeader>Product</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Unit Price</TableHeader>
              <TableHeader>Total</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <TableRow key={item._id}>
                <td className="table-data">{item.product_id.name}</td>
                <td className="table-data">{item.quantity}</td>
                <td className="table-data">${item.price.toFixed(2)}</td>
                <td className="table-data">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </TableRow>
            ))}
            <TableRow>
              <OrderSummary>
                <tr className="price-info">
                  <td>Total:</td>
                  <td className="price">${order.total_price.toFixed(2)}</td>
                </tr>
              </OrderSummary>
            </TableRow>
          </tbody>
        </ProductTable>
      </Section>
    </Container>
  );
};

export default OrderDetail;
