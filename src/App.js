import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./components/Form";
import AdminDashboard from "./components/Dashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </Router>
);

export default App;
