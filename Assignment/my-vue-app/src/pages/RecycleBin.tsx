import { useState, useEffect } from "react";
import { IProduct } from "../models";
import TableDelete from "../components/TableDelete";
import axios from "axios";
import { toast } from "react-toastify";

const RecycleBin = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const token =JSON.parse( localStorage.getItem("token") || "");
 
  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/api/v1/product?status=false`)
      .then(({ data }) => {
        console.log(data);
        setProducts(data.products.docs);
        setLoading(false);
      });
  }, []);

  const handleRestore = (id: string | number) => {
    const confirm = window.confirm("Bạn có muốn khôi phục sản phẩm ?");
    if (confirm) {
      axios
        .delete(`http://127.0.0.1:8080/api/v1/product/restore/${id}`,{
          headers:{
            Authorization: 'Bearer ' + token
          }
        })
        .then(({ data }) => {
          toast.success(data.message);
          const newData = products?.filter((item) => {
            return item._id !== id;
          });
          setProducts(newData);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };
  const deleteProduct = (id: string | number) => {
    const confirm = window.confirm("Bạn có muốn xoá vĩnh viễn sản phẩm ?");
    if (confirm) {
      axios
        .delete(`http://127.0.0.1:8080/api/v1/product/${id}`,{
          headers:{
            Authorization: 'Bearer ' + token
          }
        })
        .then(({ data }) => {
          toast.success(data.message);
          const newData = products?.filter((item) => {
            return item._id !== id;
          });
          setProducts(newData);
        });
    }
  };

  return (
    <div className="p-2 ml-64 mt-14">
      <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700 ">
        <div className="w-full border h-[150px] my-4 flex items-center justify-center">
          <h1 className="text-center text-3xl font-bold">RecycleBin</h1>
        </div>
        {loading ? (
          "Loading"
        ) : (
          <TableDelete
            products={products}
            handleRestore={handleRestore}
            deleteProduct={deleteProduct}
          />
        )}
        <div className="w-full flex justify-center items-center my-2">
          <p className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
          <p className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
        </div>
      </div>
    </div>
  );
};

export default RecycleBin;
