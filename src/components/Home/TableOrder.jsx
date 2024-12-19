import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  CardBody,
  TableResponsive,
  Table,
  TableRow,
  TableCell,
  Badge,
  IconLink,
  Pagination,
  PaginationButton,
} from "./styles";
import { FaEye } from "react-icons/fa";

const TableOrder = ({ orders, status }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Sort orders by createdAt in descending order
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  return (
    <CardBody>
      <TableResponsive>
        <Table>
          <thead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Order Date</TableCell>
              {status && <TableCell>Status</TableCell>}
              <TableCell>Actions</TableCell>
            </TableRow>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <TableRow key={order._id}>
                <TableCell>
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </TableCell>
                <TableCell>
                  <b>{order.user_id?.name || "N/A"}</b>{" "}
                </TableCell>
                <TableCell>{order.user_id?.email || "N/A"}</TableCell>
                <TableCell>${order.total_price}</TableCell>
                <TableCell>
                  {order.payment_status === "completed" ? (
                    <Badge variant="success">
                      Paid At {moment(order.paidAt).format("MMM Do YY")}
                    </Badge>
                  ) : (
                    <Badge variant="danger">Not Paid</Badge>
                  )}
                </TableCell>
                <TableCell>{moment(order.createdAt).calendar()}</TableCell>
                {status && (
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "processing" ? "success" : "danger"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                )}
                <TableCell className="eye">
                  <IconLink to={`/orders/${order._id}`}>
                    <FaEye fontSize={25} />
                  </IconLink>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableResponsive>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </PaginationButton>
        ))}
      </Pagination>
    </CardBody>
  );
};

export default TableOrder;
