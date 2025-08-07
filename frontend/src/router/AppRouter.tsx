import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sources } from "../pages/sources/Sources";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Sources />} />
    </Routes>
  </BrowserRouter>
);
