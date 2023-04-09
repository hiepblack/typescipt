import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from '../redux/hook'

const Header = () => {
  const count = useAppSelector((state) => state.cart.value)
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className="container mx-auto border bg-red-500 mb-2">
      <nav className="bg-red-500 border-red-500">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              HaHiep
            </span>
          </Link>

          <div className="relative w-3/5">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
              placeholder="Search..."
            />
          </div>

          <div className="mx-4 text-2xl font-bold flex items-center">
            {user ? (
              <p className="cursor-pointer" onClick={handleLogout}>
                Xin chào {user} Logout
              </p>
            ) : (
              <div className="flex items-center mt-2 ">
                <Link to="/auth/login" className="text-white">
                  <button
                    type="button"
                    className="text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                  >
                    SignIn
                  </button>
                </Link>
                <Link to="/auth/register" className="text-white">
                  <button
                    type="button"
                    className="text-white border border-gray-800 hover:bg-gray-900   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                  >
                    SignUp
                  </button>
                </Link>
              </div>
            )}
            <Link to="/cart">
              <button
                type="button"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white  rounded-lg border border-gray-800"
              >
                <i className="fa-solid fa-cart-shopping "></i>
                <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  {count.length}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
