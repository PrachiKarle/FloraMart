// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";

import Home from "./Home";
import Header from "./Header";
import Shop from "./Shop";
import Contact from "./Contact";
import FlowerDetails from "./FlowerDetails";
import Login from "./Login";
import Signup from "./Signup";
import AdminHeader from "./AdminHeader";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(u);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop/:id" element={<FlowerDetails user={user} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/admin" element={<AdminHeader />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
