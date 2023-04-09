import { IProduct } from "../models";
import { Link } from "react-router-dom";

interface IPops {
  products: IProduct[];
  deleteProduct:(id: string|number)=>void;
  handleRestore:(id: string|number)=>void;
}

const TableDelete = ({ products,handleRestore, deleteProduct}: IPops) => {
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
                  <button
                  onClick={()=>handleRestore(product._id)}
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                  >
                    Khôi phục
                  </button>
                  <button
                  onClick={()=>deleteProduct(product._id)}
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                  >
                    Xoá vĩnh viễn
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

export default TableDelete;
