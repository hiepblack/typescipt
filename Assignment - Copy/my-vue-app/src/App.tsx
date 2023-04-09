import "./App.css";

import Product from "./layout/Product";
import Admin from "./layout/Admin";
import User from "./layout/User";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Product />} />
        <Route path="/auth/*" element={<User />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
