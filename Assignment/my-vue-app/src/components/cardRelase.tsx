import { Link } from "react-router-dom";
import { IProduct } from "../models";

type IPops = {
  product: IProduct;
};

const CardRelase = ({ product }: IPops) => {
  const { _id, price, image, name } = product;
  return (
    <div className=" p-2 w-full">
      <img src={image[0]} alt="" className="w-full h-[250px] object-cover" />

      <div className="w-full h-[120px] my-1">
        <h3 className="my-2">{name}</h3>
        <p className="my-1">
          <span className="text-red-500 mr-1 font-semibold">{price} ₫</span>
        </p>
        <p>
          <span className="mr-2">
            <i className="fa-sharp fa-solid fa-star"></i>
            <i className="fa-sharp fa-solid fa-star"></i>
            <i className="fa-sharp fa-solid fa-star"></i>
            <i className="fa-sharp fa-solid fa-star"></i>
          </span>
          <span className="text-sm">72 đánh giá</span>
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          className="text-black border border-gray-800 hover:bg-red-400 hover:text-white  font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center mr-2 "
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2 -ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
          </svg>
          Buy now
        </button>
        <Link to={`/${_id}`}>
          <button
            type="button"
            className="text-black  hover:bg-red-400 border border-gray-800 hover:text-white font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center "
          >
            Chi tiết
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardRelase;
