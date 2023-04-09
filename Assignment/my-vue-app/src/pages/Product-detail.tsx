import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import { IProduct,ICartProduct } from "../models";
import axios from "axios";
import { useAppDispatch } from '../redux/hook'
import { addCart } from "../redux/cartSlice";
import {toast} from "react-toastify"
import CardProduct from "../components/cardProduct";
import CardRelase from "../components/cardRelase";

const ProductDetail = () => {
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [productRelase,setProductRelase] = useState<IProduct[]>()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/v1/product/${id}`).then((data) => {
      setProduct(data.data.product);
      setLoading(true)
      return data
    }).then(({data}) =>{
      const categoryId = data.product.categoryId
      axios.get(`http://127.0.0.1:8080/api/v1/product/relase/${categoryId}`).then((res) =>{
        setProductRelase(res.data.products.docs);
      })
    })
  }, [id]);

  const handleAddToCart = (product:IProduct)=>{
    const data:ICartProduct = {
      _id: product._id,
      name: product.name,
      image: product?.image?.[0],
      price: product.price,
      quantity:1,
      totalPrice: product.price
    }
    dispatch(addCart(data));
    toast.success('Thêm sản phẩm vào giỏ hàng thành công');
  }

  return (
    <div className="container mx-auto my-4">
      {loading ? (
        <>
          <h1 className="my-4 font-bold">{product?.name}</h1>
          <p className="w-full h-1 bg-slate-200"></p>
          <div className="w-full grid grid-cols-3 gap-2 my-8 ">
            <div className="w-full  flex flex-col">
              <img src={product.image[0]} alt="" />
              <div className="w-full flex h-[100px] gap-4 justify-center my-2 overflow-hidden">
                {product?.image?.map((item, index) => {
                  return (
                    <img
                      src={item}
                      alt=""
                      className="w-[90px] h-[90px] border rounded-md border-black"
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-span-2 flex flex-col justify-between py-4 px-2">
              <div className="w-full">
                <p className="w-full my-2">
                  <span className="text-2xl text-red-600 font-bold">
                    {product?.price} ₫
                  </span>{" "}
                </p>
                <p className="w-5/6 ">
                  Mô tả ngắn:{product.description}.
                </p>
              </div>
              <div className="w-full  flex gap-2">
                <button className="w-[233px] h-[48px] text-white bg-red-500 rounded mr-2 " onClick={()=>handleAddToCart(product)}>
                  Mua ngay
                </button>
                <button className="flex ">
                  <p className="w-[48px] h-[48px] flex justify-center items-center border border-black mr-2 rounded">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </p>
                  <p className="w-[70px]">Thêm vào giỏ hàng</p>
                </button>
              </div>
            </div>
          </div>

          <div className="border w-full h-[155px] bg-slate-200 mt-10 mb-4">
            <h1 className="text-center text-red-500 my-2">ĐẶC ĐIỂM NỔI BẬT</h1>
            <div className="w-full text-left pl-4 text-sm">
              <p>
                Camera chất lượng, bắt trọn từng khoảng khắc - Cụm 4 camera với
                cảm biến chính lên đến 108 MP
              </p>
              <p>
                Thưởng thức không gian giải trí cực đỉnh - Màn hình lớn 6.7
                inch, độ phân giải Full HD+, 120Hz mượt mà
              </p>
              <p>
                Cấu hình Galaxy A73 5G được nâng cấp mạnh với chip Snapdragon
                778G, RAM lên đến 8 GB
              </p>
              <p>
                Chiến game thoải mái không lo gián đoạn - Viên pin lớn 5000 mAh,
                hỗ trợ sạc nhanh 25 W
              </p>
            </div>
          </div>
          <p>
            Năm 2022 hứa hẹn sẽ là một năm rất đáng trông đợi đối với những ai
            là fan của thương hiệu điện thoại Samsung. Mới đây, hãng sẽ tiếp tục
            cho ra mắt nhiều smartphone với sự cải tiến trong thiết kế và cấu
            hình, trong đó phải kể đến chiếc Samsung Galaxy A73 với nhiều cải
            tiến so với thế hệ trước. Vậy sản phẩm có gì nổi bật, giá bao nhiêu
            và liệu có nên mua không? Tìm hiểu ngay nhé!
          </p>

          <div className="flex justify-center flex-col my-8 items-center">
            <div className=" w-full">
              <h2 className="text-2xl my-2">
                Đánh giá Samsung A73 - Hiệu năng mượt mà, chụp ảnh chuyên nghiệp
              </h2>
              <p className="text-md">
                Điện thoại cao cấp nhất dòng Galaxy A series sở hữu nhiều nâng
                cấp đáng giá so với thế hệ trước, từ ngoại hình cho đến hiệu
                năng, đặc biệt là hệ thống camera. Sau đây là những đánh giá chi
                tiết về chiếc
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-2xl my-2">
                Thiết kế sang trọng, màn hình Super AMOLED
              </h2>
              <p>
                Trước khi mua bất kỳ chiếc điện thoại nào, người dùng cũng sẽ
                quan tâm đến thiết kế sản phẩm trước. Với phiên bản A73, Samsung
                đã tạo nên một chiếc smartphone với vẻ ngoài mang đến cảm giác
                sang trọng và tinh tế.
              </p>
              <p>
                Samsung Galaxy A73 được thiết kế gọn nhẹ với tiêu chí đáp ứng
                khả năng mang theo để tiện đi lại cho người dùng. Giờ đây, bạn
                có thể mang theo chiếc smartphone bên cạnh đến bất cứ đâu, bất
                cứ lúc nào.
              </p>
              <p>
                Kích thước và trọng lượng của chiếc điện thoại rất vừa phải và
                dĩ nhiên sẽ không chiếm quá nhiều diện tích trong túi xách và có
                thể di chuyển dễ dàng.
              </p>
            </div>
            <button className="w-[335px] h-[34px] rounded-md border border-black my-4">
              Xem thêm
            </button>
          </div>
          <div>
            <h1 className="font-bold text-2xl ">Sản phẩm liên quan</h1>
            <div className="my-4 grid grid-cols-6 gap-2">
              {productRelase?.map(product=>{
                return <CardRelase product={product}/>
              })}
            </div>
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default ProductDetail;
