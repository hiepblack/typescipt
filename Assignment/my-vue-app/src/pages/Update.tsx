import { useParams, useNavigate } from "react-router-dom";
import { IProduct, ICategory } from "../models";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm, SubmitHandler, set } from "react-hook-form";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<string>();
  const [images, setImages] = useState<string[]>([]);
  const token = JSON.parse(localStorage.getItem("token") || "");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: async () => {
      if (id) {
        return await axios
          .get(`http://127.0.0.1:8080/api/v1/product/${id}`)
          .then(({ data }) => {
            setLoading(false);
            setCategoryId(data.product.categoryId);
            setImages(data.product.image);
            return data.product;
          });
      }
    },
  });

  const uploadImage = async (e: any): Promise<void> => {
    let arrImg: string[] = [];
    const files = e.target.files;
    for (const file of files) {
      const imageLink = URL.createObjectURL(file);
      arrImg.push(imageLink);
    }
    setPreview(arrImg);
    setLoading(false);
  };

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      setLoading(true);
      if (preview.length === 0) {
        setLoading(false);
        const dataupdate = await axios.put(
          `http://localhost:8080/api/v1/product/${id}`,
          data,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success(dataupdate.data.message);
        navigate("/admin");
        return;
      } else {
        const uploadData = new FormData();
        for (let i = 0; i < data.image.length; i++) {
          uploadData.append("images", data.image[i]);
        }
        const urlsImg = await axios.post(
          "http://127.0.0.1:8080/api/v1/images/upload",
          uploadData
        );
        const imageLink = urlsImg.data.urls;
        let arrImg: string[] = [];
        for (let i = 0; i < imageLink.length; i++) {
          arrImg.push(imageLink[i].url);
        }
        const objData = {
          ...data,
          image: arrImg,
        };
        setLoading(false);
        const dataupdate = await axios.put(
          `http://localhost:8080/api/v1/product/${id}`,
          objData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success(dataupdate.data.message);
        navigate("/admin");
      }
    } catch (error: any) {
      toast.warning("Oopps! Cập nhật thất bại !!");
      console.log(error.message);
    }
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/v1/categories`).then(({ data }) => {
      setCategory(data.categories);
    });
  }, [id]);

  const Spin = () => {
    return (
      <>
        <svg
          aria-hidden="true"
          className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </>
    );
  };

  return (
    <div className="p-2 ml-64 mt-14">
      <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700 ">
        <div className="w-full border h-[150px] my-4 flex items-center justify-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
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
                      {...register("image", {
                        onChange: uploadImage,
                      })}
                    />
                    <img
                      src={preview.length == 0 ? images?.[0] : preview?.[0]}
                      alt=""
                      className="absolute h-full w-full object-cover z-10"
                    />
                  </div>
                  <div className="w-full grid grid-cols-4 gap-2  ">
                    {preview.length == 0
                      ? images?.map((item, index) => {
                          return <img src={item} alt="" className="border" />;
                        })
                      : preview?.map((item) => {
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
                      {...register("name", {
                        required: true,
                      })}
                    />
                    <p>
                      {errors.name && (
                        <span>Không được bỏ trống tên sản phẩm</span>
                      )}
                    </p>
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
                      {...register("brand", {
                        required: true,
                      })}
                    />
                    <p>
                      {errors.brand && (
                        <span>Không được bỏ trống thương hiệu sản phẩm</span>
                      )}
                    </p>
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
                      {...register("price", {
                        required: true,
                      })}
                    />
                    <p>
                      {" "}
                      {errors.price && (
                        <span>Không được bỏ trống giá sản phẩm</span>
                      )}
                    </p>
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
                      {...register("categoryId")}
                    >
                      {category &&
                        category.map((item, index) => {
                          return (
                            <option
                              value={item._id}
                              selected={item._id === categoryId ? true : false}
                            >
                              {item.name}
                            </option>
                          );
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
                      {...register("quality", {
                        required: true,
                      })}
                    />
                    <p>
                      {" "}
                      {errors.quality && (
                        <span>Không được bỏ trống số lượng sản phẩm</span>
                      )}
                    </p>
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
                      {...register("description", {
                        required: true,
                      })}
                    ></textarea>
                    <p>
                      {errors.description && (
                        <span>Không được bỏ trống mô tả sản phẩm</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="text-white bg-red-500 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex"
                      disabled={loading}
                    >
                      {loading && <Spin />}
                      Update product
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
