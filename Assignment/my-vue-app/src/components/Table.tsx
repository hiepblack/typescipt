import { IProduct } from "../models";
import { Link } from "react-router-dom";

interface IPops {
  products: IProduct[];
  handleDelete:(id:string | number) => void;
}

const Table = ({ products,handleDelete }: IPops) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product?.categoryId?.name}</td>
                <td className="px-6 py-4 ">
                  <p className="w-[100px] truncate">{product.description}</p>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/update/${product._id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                  >
                    <button
                      type="button"
                      className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                    onClick={()=>handleDelete(product._id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
