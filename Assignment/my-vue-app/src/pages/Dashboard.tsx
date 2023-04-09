import { useState, useEffect } from "react";
import { IProduct } from "../models";
import Table from "../components/Table";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [number, setNumber] = useState<number>(0);
  const [brand, setBrand] = useState<string>("");

  const test = localStorage.getItem('token')
  let token:string
  if(test){
     token = JSON.parse(localStorage.getItem("token") || "");
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/api/v1/product/?page=${page}&brand=${brand}`)
      .then(({ data }) => {
        console.log(data.products.docs);
        setProducts(data.products.docs);
        setLoading(false);
        setNumber(data.products.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, brand]);

  const handleChangeBrand: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setBrand(e.target.value);
  };
  const handleDelete = (id: string | number) => {
    const confirm = window.confirm("Bạn có chắc muốn xoá sản phẩm");
    if (confirm) {
      axios
        .delete(`http://127.0.0.1:8080/api/v1/product/${id}?status=false`, {
          headers: {
            Authorization: "Bearer " + token,
          },
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
  return (
    <div className="p-2 ml-64 mt-14">
      <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700 ">
        <div className="w-full border h-[150px] my-4 flex items-center justify-center">
          <h1 className="text-center text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="w-full grid grid-cols-2 gap-4 my-2">
          <div className="w-full my-2">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Bộ lọc
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 h-[40px]"
              value={brand}
              onChange={handleChangeBrand}
            >
              <option defaultChecked value="">
                Lọc theo thương hiệu
              </option>
              <option value="Apple">Apple</option>
              <option value="samsung">SamSung</option>
              <option value="Xiaomi">Xiaomi</option>
            </select>
          </div>
          <div className="w-full mt-4 flex justify-end items-center ">
            <form className="w-1/2 ">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tìm kiếm theo tên..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {loading ? (
          "Loading"
        ) : (
          <Table products={products} handleDelete={handleDelete} />
        )}
        <div className="w-full flex justify-center items-center my-2">
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
              } else {
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
