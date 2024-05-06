import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import PrivateRoutes from "./utils/PrivateRoutes";
import CarPage from "./pages/car";
import CategoryPage from "./pages/category";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<CarPage />} path="/" exact />
          <Route element={<CategoryPage />} path="category" />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;
