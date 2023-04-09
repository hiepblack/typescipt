import "./App.css";
import Product from "./layout/Product";
import Admin from "./layout/Admin";
import User from "./layout/User";
import { ToastContainer,toast } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<Product />} />
        <Route path="/auth/*" element={<User />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000}/>
    </>
  );
}

export default App;
