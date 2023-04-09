import axios from "axios";
import { useState, useEffect } from "react";
import { IProduct,ICategory } from "../models";
import {useNavigate} from "react-router-dom"


const AddNewProduct = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [category, setCategory] = useState<ICategory[]>([]);
  const token = JSON.parse(localStorage.getItem("token") || "");
  console.log(token);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/v1/categories`).then(({ data }) => {
      console.log(data.categories);
      setCategory(data.categories);
    });
  }, []);

  const uploadImage = async (e: any): Promise<void> => {
    const files = e.target.files;
    const data = new FormData();
    let url: string[] = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      data.append("file", file);
      data.append("upload_preset", "eb6jpxn6");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbhyz5cgb/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const fileUrl = await res.json();
      console.log(fileUrl);
      url.push(fileUrl.url);
    }
    setProduct((pre) => {
      return {
        ...pre,
        image: url,
      };
    });
  };

  const handleAddProduct: React.FormEventHandler<HTMLFormElement> = async (
    e: any
  ) => {
    e.preventDefault();
    console.log(product);
    try {
      const postData = await axios.post(
        "http://127.0.0.1:8080/api/v1/product",product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(postData);
      if(postData.status === 200) {
        alert(postData.data.message);
        navigate('/admin')
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-2 ml-64 mt-14">
      <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700 ">
        <div className="w-full border h-[150px] my-4 flex items-center justify-center">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add product
          </h2>
        </div>

        <div className="w-full">
          <section className="bg-white dark:bg-gray-900 w-full">
            <div className="w-full px-4 py-8 mx-auto lg:py-16">
              <form
                className="w-full flex gap-2"
                onSubmit={handleAddProduct}
                encType="multipart/form-data"
              >
                <div className="w-2/5">
                  <div className="w-full h-[280px]  my-2 relative">
                    <label
                      htmlFor="img"
                      className="absolute inset-0 bg-slate-200 grid place-items-center cursor-pointer text-2xl rounded-lg z-20  bg-transparent "
                    >
                      <p className="flex justify-center items-center flex-col">
                        <i className="fa-solid fa-upload"></i>
                        <span className="block text-xl "> Thêm ảnh</span>
                      </p>
                    </label>
                    <input
                      type="file"
                      id="img"
                      hidden
                      onChange={uploadImage}
                      multiple
                    />
                    <img
                      src={product.image ? product.image[0] : ""}
                      alt=""
                      className="absolute h-full w-full object-cover z-10"
                    />
                  </div>

                  <div className="w-full grid grid-cols-4 gap-2  ">
                    {product.image &&
                      product.image.map((item, index) => {
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
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      value={product.name}
                      onChange={(e) =>
                        setProduct((pre) => {
                          return {
                            ...pre,
                            name: e.target.value,
                          };
                        })
                      }
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
                      name="brand"
                      id="brand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={product.brand}
                      placeholder="Product brand"
                      onChange={(e) =>
                        setProduct((pre) => {
                          return {
                            ...pre,
                            brand: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Giá
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$299"
                      value={product.price}
                      onChange={(e) =>
                        setProduct((pre) => {
                          return {
                            ...pre,
                            price: Number(e.target.value),
                          };
                        })
                      }
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
                      onChange={(e) => {
                        setProduct((pre: any) => {
                          return {
                            ...pre,
                            categoryId: e.target.value,
                          };
                        });
                      }}
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
                      Số lượng
                    </label>
                    <input
                      type="number"
                      name="item-weight"
                      id="item-weight"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="200"
                      value={product.quality}
                      onChange={(e) =>
                        setProduct((pre) => {
                          return {
                            ...pre,
                            quality: e.target.value,
                          };
                        })
                      }
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
                      value={product.description}
                      onChange={(e) =>
                        setProduct((pre) => {
                          return {
                            ...pre,
                            description: e.target.value,
                          };
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="text-white bg-red-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Add product
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

export default AddNewProduct;
