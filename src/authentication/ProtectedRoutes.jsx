/* eslint-disable no-else-return */
import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAllUsers } from "../redux/features/allUsersSlice";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/admin/getAdminUserData`,
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res, "Protected");

      if (res.data.success === true) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to={"/login"} />;
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers()
    getUsers()
  }, []);

  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/admin/getUsers`, {})
      .then((data) => {
        dispatch(setAllUsers(data.data));
        console.log(data.data,"ASassasasasasasasdsagdgsdftrerter");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoutes;
