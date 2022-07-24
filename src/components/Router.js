import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

export default function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return <Router>
    <Routes>
      { isLoggedIn? <Route exact path="/" element={<Home />} /> : <Route exact path="/" element={<Auth />} /> }
    </Routes>
  </Router>
}