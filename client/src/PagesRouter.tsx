import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CatalogsPage } from "./pages/CatalogsPage";
import { EditCatalogPage } from "./pages/EditCatalogPage";  // Assuming you have this page
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";

const PagesRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogs" element={<CatalogsPage />} />
        <Route path="/catalogs/edit/:catalogId" element={<EditCatalogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default PagesRouter;
