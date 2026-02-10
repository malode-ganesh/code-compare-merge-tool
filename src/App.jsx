import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import DiffTool from "./pages/DiffTool";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">&#9889;</span>
        CodeCompare
      </Link>
      <div className="navbar-links">
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
        <Link to="/tool" className="btn-primary-sm">Open Tool</Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tool" element={<DiffTool />} />
      </Routes>
    </>
  );
}
