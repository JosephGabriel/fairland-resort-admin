import { Navigate, Outlet } from "react-router-dom";

import { useAuthUserQuery } from "../../services/apollo/user/variables/user";

export const NonProtectedRoute = () => {
  const { data } = useAuthUserQuery();

  return !data?.authUser ? <Outlet /> : <Navigate to={"/dashboard"} replace />;
};
