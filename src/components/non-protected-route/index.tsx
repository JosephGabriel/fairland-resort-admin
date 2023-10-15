import { Navigate, Outlet } from "react-router-dom";

import { useUserContext } from "@src/contexts/user";

export const NonProtectedRoute = () => {
  const { user } = useUserContext();

  return !user ? <Outlet /> : <Navigate to={"/dashboard"} replace />;
};
