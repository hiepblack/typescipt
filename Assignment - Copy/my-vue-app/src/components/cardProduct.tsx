import { Link } from "react-router-dom";
import { IProduct } from "../models";


type IPops = {
  product: IProduct
}

const CardProduct = ({product}:IPops) => {
  const {_id,price,image,name} = product;
  console.log(product);
  
  return (
    <Link to={`/${_id}`}>
      <div className=" p-2 w-full">
         <img src={image[0]} alt="" className="w-full h-[250px] object-cover"/>
        
        <div className="w-full h-1/4 my-1">
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
      </div>
    </Link>
  );
};

export default CardProduct;
