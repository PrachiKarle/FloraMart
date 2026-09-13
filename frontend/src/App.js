import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./Home";
import Header from "./Header";
import Shop from "./Shop";
import Contact from "./Contact";
import FlowerDetails from "./FlowerDetails";
import Login from "./Login";
import Signup from "./Signup";
import AdminHeader from "./AdminHeader";
import Profile from "./Profile";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // console.log("Logged in user:", parsedUser);

        setUser(parsedUser);
      } catch (error) {
        console.log("Invalid user data:", error);
        setUser(null);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header user={user} />}>
          <Route index element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/shop/:id" element={<FlowerDetails user={user} />} />

          <Route path="/profile" element={<Profile user={user}/>} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/admin" element={<AdminHeader />} />
      </Routes>
    </Router>
  );
}

export default App;
