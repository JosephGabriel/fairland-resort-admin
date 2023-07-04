import { Navigate, Outlet } from "react-router-dom";

import { useAuthUserQuery } from "../../services/apollo/user/variables/user";

import { Navbar } from "../navbar";

export const ProtectedRoute = () => {
  const { data } = useAuthUserQuery();

  return data?.authUser ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/"} replace />
  );
};
