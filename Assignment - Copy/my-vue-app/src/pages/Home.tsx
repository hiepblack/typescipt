import Banner from "../components/Banner";
import ListCard from "../components/ListCard";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Banner />
      <h1 className="my-4 text-2xl">Điện thoai nổi bật nhất</h1>
      <ListCard />
    </div>
  );
};

export default Home;
