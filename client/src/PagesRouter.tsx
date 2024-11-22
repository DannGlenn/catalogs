import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CatalogsPage } from "./pages/CatalogsPage";
import { EditCatalogPage } from "./pages/EditCatalogPage";  // Assuming you have this page

const PagesRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/catalogs" element={<CatalogsPage />} />
        <Route path="/catalogs/edit/:catalogId" element={<EditCatalogPage />} />
      </Routes>
    </Router>
  );
};

export default PagesRouter;
