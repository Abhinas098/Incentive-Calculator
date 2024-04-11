import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/Auth/Register";
import Login from "./components/Auth/login";
import IncentiveCalculator from "./components/Incentive/IncentiveCalculator";
import PackageManager from "./components/Admin/HolidayPackage";

import AuthCtx from "./context/AuthCtx";

const Routers = () => {
  const ctx = useContext(AuthCtx);

  const isAdmin = ctx.isLogin
    ? typeof ctx.token === "string"
      ? JSON.parse(ctx.token)?.isAdmin
      : ctx.token?.isAdmin
    : false;

  return (
    <Routes>
      {!ctx.isLogin && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
      {ctx.isLogin && (
        <>
          <Route path="/" element={<Navigate to="/incentive" />} />
          {!isAdmin && (
            <Route path="/incentive" element={<IncentiveCalculator />} />
          )}
          {isAdmin && <Route path="/packages" element={<PackageManager />} />}
          {!isAdmin && (
            <Route path="*" element={<Navigate to="/incentive" />} />
          )}
          <Route path="*" element={<Navigate to="/packages" />} />
        </>
      )}
    </Routes>
  );
};

export default Routers;
