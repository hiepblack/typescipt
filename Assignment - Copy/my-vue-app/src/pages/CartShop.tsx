import { Link } from "react-router-dom";
import Cart from "../components/Cart";

const CartShop = () => {
  return (
    <div className="container mx-auto ">
      <div className="flex h-[50px] border-b border-black items-center w-[580px] justify-center mx-auto my-4">
        <Link to="/" className="block w-2/4">
          <i className="fa-solid fa-arrow-left"></i>
          <span>Trở về</span>
        </Link>
        <h2 className="w-3/4 text-2xl">Giỏ hàng</h2>
      </div>
      <div className="w-3/4 mx-auto border flex flex-col items-center">
        <Cart />
        <Cart />
        <Cart />
      </div>
      <div className="w-3/4 mx-auto  flex flex-col items-center my-2">
          <p className="w-[580px]  flex justify-between">
            <span className="text-xl font-bold">Tổng tiền tạm tính:</span>
            <span className="font-medium">17.820.000 ₫</span>
          </p>
          <button className="w-[580px] h-[60px] text-white bg-red-600 my-2 rounded">Tiến hành đặt hàng</button>
          <button className="w-[580px] h-[60px] text-red-600 bg-white my-2 rounded border border-black">Chọn thêm sản phẩm khác</button>
      </div>
    </div>
  );
};

export default CartShop;
