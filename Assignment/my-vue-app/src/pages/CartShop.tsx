import { Link, useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import { deleteCart, deleteAllCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICartProduct } from "../models";
import axios from "axios";

type IOrder = {
  username: string;
  orderdetailId: string;
  totalAmount: number;
  address: string;
  note: string;
  status?: boolean;
};

type IOderDetail = {
  list: ICartProduct[];
  totalMoney: number;
  totalQuantity: number;
};

const CartShop = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.value);
  const totalMoney = useAppSelector((state) => state.cart.totalMoney);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const handleDeleteCart = (id: string | number) => {
    dispatch(deleteCart(id));
    toast.success("Đã xoá thành công");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrder>();

  const onSubmit: SubmitHandler<IOrder> = async (data) => {
    const dataDetail: IOderDetail = {
      list: cart,
      totalMoney: totalMoney,
      totalQuantity: totalQuantity,
    };
    const res = await axios.post(
      "http://127.0.0.1:8080/api/v1/orderdetail",
      dataDetail
    );
    const dataOder: IOrder = {
      username: data.username,
      orderdetailId: res.data.detail._id,
      totalAmount: totalMoney,
      address: data.address,
      note: data.note,
      status: true,
    };
    const order = await axios.post(
      "http://127.0.0.1:8080/api/v1/order",
      dataOder
    );
    if (order.status === 200) {
      dispatch(deleteAllCart(true));
      toast.success("Đặt hàng thành công");
      navigate("/");
    }
  };
  return (
    <div className=" container mx-auto grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="flex h-[50px] border-b border-black items-center w-full justify-center mx-auto my-4">
          <Link to="/" className="block w-2/4">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Trở về</span>
          </Link>
          <h2 className="w-3/4 text-2xl font-bold">Giỏ hàng</h2>
        </div>
        <div className="w-full mx-auto flex flex-col items-center">
          {cart.length ? (
            cart?.map((item) => {
              return <Cart item={item} handleDeleteCart={handleDeleteCart} />;
            })
          ) : (
            <p className="text-2xl font-bold my-4">Không có sản phẩm</p>
          )}
        </div>
        <div className="w-3/4 mx-auto  flex flex-col items-center my-2">
          <p className="w-[580px]  flex justify-between">
            <span className="text-xl font-bold">Tổng tiền tạm tính:</span>
            <span className="font-medium">{totalMoney} ₫</span>
          </p>
        </div>
      </div>
      {/* form */}
      <div className="my-4 col-span-1">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tên
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("username", { required: true })}
            />
            {errors.username && <p>This field is required</p>}
          </div>
          <div>
            <label
              htmlFor="sdt"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Địa chỉ
            </label>
            <input
              type="text"
              id="sdt"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("address")}
            />
            {errors.address && <p>This field is required</p>}
          </div>
          <div>
            <label
              htmlFor="note"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ghi chú
            </label>
            <textarea
              id="note"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("note")}
            ></textarea>
            {errors.note && <p>This field is required</p>}
          </div>

          <button
            className="w-full h-[60px] text-white bg-red-600 my-2 rounded"
            type="submit"
          >
            Tiến hành đặt hàng
          </button>
          <Link to="/">
            <button className="w-full h-[60px] text-red-600 bg-white my-2 rounded border border-black">
              Chọn thêm sản phẩm khác
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CartShop;
