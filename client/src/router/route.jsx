import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuthProvider";
import MainLayout from "../layouts/MainLayout";
const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
};

export default PrivateRoute;