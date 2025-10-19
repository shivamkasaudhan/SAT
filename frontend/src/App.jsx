import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Legacy from "./pages/Lagecy";
import Login from "./pages/Login";
import SignUp from "./pages/signup";
import * as jwt_decode from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const now = Date.now() / 1000; // in seconds
        if (decoded.exp > now) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token"); // expired
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Pages with Navbar & Footer */}
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Navbar isLoggedIn={isLoggedIn} />
              <main className="flex-grow mt-16">
                <Home />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/products"
          element={
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Navbar isLoggedIn={isLoggedIn} />
              <main className="flex-grow mt-16">
                <Products />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/legacy"
          element={
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Navbar isLoggedIn={isLoggedIn} />
              <main className="flex-grow mt-16">
                <Legacy />
              </main>
              <Footer />
            </div>
          }
        />

        {/* Pages without Navbar & Footer */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
