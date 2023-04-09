import React from "react";
import img from "../assets/Rectangle (1).png";

const Cart = () => {
  return (
    <div
      className="w-[570px] h-[250px] border border-black p-2 my-4 flex rounded-md"
    >
        <img src={img} alt="" className="h-full"/>
        <div className="relative">
            <p className="absolute top-0 right-[-20px] w-[30px] h-[30px] border border-black text-center rounded">
                X
            </p>
                <h3 className="text-2xl font-bold text-red-400 my-4">Samsung Galaxy S22-Đen</h3>
                <p className="text-xl font-bold text-">16.090.000 ₫</p>
                <div>
                    <span className="mr-2">Chọn số lượng:</span>
                    <input type="number" defaultValue={1} className="w-[40px] border border-black text-center"/>
                </div>
        </div>
    </div>
  );
};

export default Cart;
