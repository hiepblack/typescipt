import img from "../assets/banner3.png";

const Banner = () => {
  return (
    <div className="container mx-auto object-cover h-[400px]">
        <img src={img} alt="" className="h-full w-full object-cover"/>
    </div>
  )
}

export default Banner