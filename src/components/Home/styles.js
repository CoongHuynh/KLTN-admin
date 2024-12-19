import styled from "styled-components";
import { Link } from "react-router-dom";

export const ContentMain = styled.section`
  position: relative;
  padding: 10px;
  flex: 1;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const ContentTittle = styled.h2`
  /* Add any additional styles if needed */
`;

export const TotalRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`;

export const TotalCol = styled.div`
  position: relative;
  flex: 1 1 30%;

  @media (max-width: 992px) {
    flex: 100%;
  }
`;

export const TotalCard = styled.div`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

export const CardBody = styled.div`
  padding: 1rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.075);
`;

export const IconText = styled.article`
  display: flex;
  align-items: center;
`;

export const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor || "#f8f9fa"};
  color: ${(props) => props.color || "#000"};
`;

export const Text = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

export const Title = styled.p`
  margin-bottom: 0.25rem;
  font-size: 1.15rem;
  font-weight: 500;
`;

export const Value = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

export const CardTitle = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
`;

export const TableResponsive = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #dee2e6;
  .eye {
    display: flex;
    justify-content: flex-end;
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;

  &.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.3em 0.45em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
  color: ${(props) => (props.variant === "success" ? "#fff" : "#fff")};
  background-color: ${(props) =>
    props.variant === "success" ? "#28a745" : "#dc3545"};
`;

export const IconLink = styled(Link)`
  color: #28a745;
  text-decoration: none;
  &:hover {
    color: #218838;
  }
`;
