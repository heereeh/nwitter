import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

export default function AppRouter({isLoggedIn}) {
  return <Router>
    { isLoggedIn && <Navigation /> }
    <Routes>
      { isLoggedIn? (
        <>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
        </>
      ) : (
        <>
          <Route exact path="/" element={<Auth />} />
        </>
      )}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  </Router>
}