import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/login";

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};
