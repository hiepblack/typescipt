import { Routes, Route, useNavigate } from "react-router-dom";
import SlideBar from "../components/SlideBar";
import Dashboard from "../pages/Dashboard";
import Update from "../pages/Update";
import AddNewProduct from "../pages/AddNewProduct";
import RecycleBin from "../pages/RecycleBin";
import { useEffect } from "react";

const admin = () => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    const isAuth = localStorage.getItem("isAuth");
    if ( typeof isAuth === 'string') {
        console.log(isAuth);
        const auth = JSON.parse(isAuth);
        if(!auth){
          navigate('/')
        }
    }
  },[])

  return (
    <div className="container mx-auto h-screen">
      <SlideBar />
      <Routes>
        
        <Route path="/" element={<Dashboard />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/add" element={<AddNewProduct />} />
        <Route path="/delete" element={<RecycleBin />} />

      </Routes>
    </div>
  );
};

export default admin;
