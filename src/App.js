import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import PrivateRoutes from "./utils/PrivateRoutes";
import CarPage from "./pages/car";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<CarPage />} path="/" exact />
          <Route element={<h1>all categories</h1>} path="/vehicle-categories" />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;
