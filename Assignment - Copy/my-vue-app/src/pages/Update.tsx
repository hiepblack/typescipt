import { useParams, useNavigate } from "react-router-dom";
import { IProduct, ICategory } from "../models";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<ICategory[]>([]);
  const {
    register,
    handleSubmit,
    getValues ,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: async () => {
      if (id) {
        return await axios
          .get(`http://127.0.0.1:8080/api/v1/product/${id}`)
          .then(({ data }) => {
            return data.product;
          });
      }
    },
  });

  const images = getValues('image') || [];

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/v1/categories`).then(({ data }) => {
      console.log(data.categories);
      setCategory(data.categories);
    });
  }, [id]);

  return (
    <div className="p-2 ml-64 mt-14">
      <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700 ">
        <div className="w-full border h-[150px] my-4 flex items-center justify-center">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Update product
          </h2>
        </div>
        <div className="w-full">
          <section className="bg-white dark:bg-gray-900 w-full">
            <div className="w-full px-4 py-8 mx-auto lg:py-16">
              <form
                action="#"
                className="w-full flex  gap-2"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="w-2/5">
                  <div className="w-full h-[430px]  my-2 relative">
                    <label
                      htmlFor="img"
                      className="absolute inset-0 bg-slate-200 grid place-items-center cursor-pointer text-2xl rounded-lg"
                    >
                      <p className="flex justify-center items-center flex-col z-50">
                        <i className="fa-solid fa-upload"></i>
                        <span className="block text-xl"> Thêm ảnh</span>
                      </p>
                    </label>
                    <input
                      type="file"
                      id="img"
                      hidden
                      multiple
                      {...register("image")}
                    />
                    <img
                      src={images && images?.[0]}
                      alt=""
                      className="absolute h-full w-full object-cover z-10"
                    />
                  </div>

                  <div className="w-full grid grid-cols-4 gap-2  ">
                    {images &&
                      images?.map((item, index) => {
                        return <img src={item} alt="" className="border" />;
                    })}

                  </div>
                </div>
                <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5 w-3/5">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      {...register("name")}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Thương hiệu
                    </label>
                    <input
                      type="text"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Product brand"
                      {...register("brand")}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Giá Gốc
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$299"
                      {...register("price")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Danh mục
                    </label>
                    <select
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      {category &&
                        category.map((item, index) => {
                          return <option value={item._id}>{item.name}</option>;
                        })}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="item-weight"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số Lượng
                    </label>
                    <input
                      type="number"
                      id="item-weight"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="200"
                      {...register("quality")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      rows={8}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a product description here..."
                      {...register("description")}
                    ></textarea>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="text-white bg-red-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Update product
                    </button>
                    <button
                      type="button"
                      className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      <svg
                        className="w-5 h-5 mr-1 -ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Update;
