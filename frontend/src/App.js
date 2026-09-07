// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Shop from "./Shop";
import Contact from "./Contact";
import FlowerDetails from "./FlowerDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop/:id" element={<FlowerDetails/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
