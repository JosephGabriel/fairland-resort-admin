import { Navigate, Outlet } from "react-router-dom";

import { useUserContext } from "@contexts/user";

import { Navbar } from "../navbar";

export const ProtectedRoute = () => {
  const { user } = useUserContext();

  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/"} replace />
  );
};
