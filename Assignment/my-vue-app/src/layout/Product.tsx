import { Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../pages/Home";
import ProductDetail from "../pages/Product-detail";
import CartShop from "../pages/CartShop";


const Product = () => {
  
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="/:id" element={<ProductDetail/>}></Route>
          <Route path="/cart" element={<CartShop />}></Route>
        </Routes>
      <Footer />
    </>
  );
};

export default Product;
