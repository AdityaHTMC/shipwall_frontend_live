import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";
import Login from "./LoginPage";
import { Link } from "react-router-dom";
import Error from "./Error";

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isLogIn } = useAppContext();

  if (isLogIn === false) {
    navigate("/");
    return (
      <Error/>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
