import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "../components/protected-route";
import { NonProtectedRoute } from "../components/non-protected-route";

import { LoginPage } from "../pages/login";
import { HotelsPage } from "../pages/hotels";
import { DashBoardPage } from "../pages/dashboard";
import { HotelPage } from "../pages/hotel";

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<NonProtectedRoute />}>
        <Route index element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route index element={<DashBoardPage />} />
        <Route path="hotels" element={<HotelsPage />} />
        <Route path="hotels/:id" element={<HotelPage />} />
      </Route>
    </Routes>
  );
};
