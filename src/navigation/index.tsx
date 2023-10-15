import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@src/components/protected-route";
import { NonProtectedRoute } from "@src/components/non-protected-route";

import { LoginPage } from "@src/pages/login";
import { HotelsPage } from "@src/pages/hotels";
import { DashBoardPage } from "@src/pages/dashboard";
import { HotelPage } from "@src/pages/hotel";
import { BookingsPage } from "@src/pages/bookings";

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

        <Route path="bookings" element={<BookingsPage />} />
        <Route path="bookings/:id" element={<HotelPage />} />
      </Route>
    </Routes>
  );
};
