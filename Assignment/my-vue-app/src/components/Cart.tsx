import { ICartProduct } from "../models";

type IProp ={
  item: ICartProduct,
  handleDeleteCart:(id:string|number) => void
}

const Cart = ({item,handleDeleteCart}:IProp) => {
  return (
    <div
      className="w-4/5 h-[250px] border border-black p-2 my-4 flex rounded-md"
    >
        <img src={item?.image} alt="" className="h-full w-2/5"/>
        <div className="relative w-full">
            <p className="absolute top-[-5px] right-0 w-[30px] h-[30px] border border-black text-center rounded cursor-pointer"
              onClick={()=>handleDeleteCart(item._id)}
            >
                X
            </p>
                <h3 className="text-2xl font-bold text-red-400 my-4">{item?.name}</h3>
                <p className="text-xl font-bold text-">{item.totalPrice} ₫</p>
                <div>
                    <span className="mr-2">Chọn số lượng:</span>
                    <input type="number" value={item.quantity} className="w-[40px] border border-black text-center"/>
                </div>
        </div>
    </div>
  );
};

export default Cart;
