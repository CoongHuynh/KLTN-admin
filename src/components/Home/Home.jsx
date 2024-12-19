import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/orderSlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import {
  ContentMain,
  ContentHeader,
  ContentTittle,
  TotalRow,
  TotalCol,
  TotalCard,
  CardBody,
  IconText,
  Icon,
  Text,
  Title,
  Value,
} from "./styles";
import { FaShoppingBag } from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoLogoUsd } from "react-icons/io";
import TableOrder from "./TableOrder";

const Home = () => {
  const dispatch = useDispatch();
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.orders);
  const {
    products,
    totalProducts,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);
  console.log(orders, products);
  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalSales = orders
    .filter((order) => order.payment_status === "completed")
    .reduce((total, order) => total + order.total_price, 0);

  return (
    <ContentMain>
      {(ordersLoading || productsLoading) && (
        <div className="loading">
          <div></div>
        </div>
      )}

      {(ordersError || productsError) && <p>{ordersError}</p>}
      <ContentHeader>
        <ContentTittle> Dashboard </ContentTittle>
      </ContentHeader>

      <TotalRow>
        <TotalCol>
          <TotalCard>
            <CardBody>
              <IconText>
                <Icon bgColor="#cce5ff" color="#004085">
                  <IoLogoUsd size={25} />
                </Icon>
                <Text>
                  <Title>Total Sales</Title>
                  <Value>${totalSales}</Value>
                </Text>
              </IconText>
            </CardBody>
          </TotalCard>
        </TotalCol>
        <TotalCol>
          <TotalCard>
            <CardBody>
              <IconText>
                <Icon bgColor="#d4edda" color="#155724">
                  <BiSolidShoppingBags size={25} />
                </Icon>
                <Text>
                  <Title>Total Orders</Title>
                  <Value>{orders.length}</Value>
                </Text>
              </IconText>
            </CardBody>
          </TotalCard>
        </TotalCol>
        <TotalCol>
          <TotalCard>
            <CardBody>
              <IconText>
                <Icon bgColor="#fff3cd" color="#856404">
                  <FaShoppingBag size={25} />
                </Icon>
                <Text>
                  <Title>Total Products</Title>
                  <Value>{totalProducts}</Value>
                </Text>
              </IconText>
            </CardBody>
          </TotalCard>
        </TotalCol>
      </TotalRow>

      <TableOrder orders={orders} status={false} />
    </ContentMain>
  );
};

export default Home;
