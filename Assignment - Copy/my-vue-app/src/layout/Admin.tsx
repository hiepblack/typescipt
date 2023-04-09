import { Routes, Route } from "react-router-dom";
import SlideBar from "../components/SlideBar";
import Dashboard from "../pages/Dashboard";
import Update from "../pages/Update";
import AddNewProduct from "../pages/AddNewProduct";

const admin = () => {
  return (
    <div className="container mx-auto h-screen">
      <SlideBar />
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/add" element={<AddNewProduct />} />
      </Routes>
    </div>
  );
};

export default admin;
