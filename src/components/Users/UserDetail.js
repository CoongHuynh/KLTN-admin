import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, deleteUser } from "../../redux/slices/userSlice";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import {
  ProfileContainer,
  Header,
  InfoSection,
  InfoBlock,
  InfoBlock2,
  Button,
  Logo,
  ProfileTop,
  ProfileInfo,
} from "./styles";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (!userDetail || userDetail._id !== id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, userDetail]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User has been deleted.",
      });
      navigate("/users");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to delete user",
      });
    }
  };
  console.log(userDetail);
  const { name, address, email, phone } = userDetail;
  const { street, city } = address || {};

  return (
    <>
      {loading && (
        <div className="loading">
          <div></div>
        </div>
      )}{" "}
      {error && <p>{error}</p>}
      {!userDetail && <p>No user found</p>}
      <ProfileContainer>
        <Button className="go-back" onClick={() => navigate(`/users`)}>
          Go Back
        </Button>{" "}
        <ProfileTop>
          <Header />
          <Logo
            src={`${process.env.PUBLIC_URL}/avatar-user.gif`}
            alt="Seller Logo"
          />
          <ProfileInfo>
            <div className="detail-info">
              <h2>{name}</h2>
              <p>
                {street}, {city}
              </p>
            </div>
          </ProfileInfo>
        </ProfileTop>
        <InfoSection>
          <InfoBlock>
            <h3>Total Order</h3>
            <p className="total-info">4</p>
            <h3>Total Paid</h3>
            <p className="total-info">$2380</p>
          </InfoBlock>
          <InfoBlock2>
            <h3>Contacts</h3>
            <p>Full Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </InfoBlock2>
          <InfoBlock2>
            <h3>Address</h3>
            <p>
              Address: {street}, {city}
            </p>
          </InfoBlock2>
        </InfoSection>
        <div className="del-user">
          <Button onClick={handleDelete}>
            Delete User <FaTrashAlt />
          </Button>
        </div>
      </ProfileContainer>
    </>
  );
};

export default UserDetail;
