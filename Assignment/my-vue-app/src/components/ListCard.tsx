import React, { useState, useEffect } from "react";
import CardProduct from "./cardProduct";
import { IProduct,ICartProduct } from "../models";
import axios from "axios";
import { useAppDispatch } from '../redux/hook'
import { addCart } from "../redux/cartSlice";
import {toast} from "react-toastify"

const ListCard = () => {
  const dispatch = useAppDispatch()
  const [products, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/api/v1/product/?page=${page}`)
      .then(({ data }) => {
        console.log(data.products);
        setProduct(data.products.docs);
        setLoading(true);
        setNumber(data.products.totalPages);
      });
  }, [page]);
  
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
    <div className="container mx-auto">
      {loading ? (
        <main className="w-full grid grid-cols-6 gap-4">
          {products.map((product: IProduct, index: number) => {
            return <CardProduct product={product} key={index} handleAddToCart={handleAddToCart}/>;
          })}
        </main>
      ) : (
        <>Loading</>
      )}

      <nav
        aria-label="Page navigation example"
        className="w-full grid place-items-center my-8"
      >
        <ul className="inline-flex -space-x-px">
          <p
            onClick={() => {
              if (page === 1) {
                return;
              }
              setPage(page - 1);
            }}
            className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Previous
          </p>
          <p
            onClick={() => {
              if (page >= number) {
                return;
              }else{
                setPage(page + 1);
              }
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </p>
        </ul>
      </nav>
    </div>
  );
};

export default ListCard;
