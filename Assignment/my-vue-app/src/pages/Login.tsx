import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email('Định dạng phải là email').required("Trường bắt buộc nhập"),
  password: yup.string().required("Trường bắt buộc nhập").min(6,"Tối thiểu 6 kí tự"),
})

type Inputs = yup.InferType<typeof schema>

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/signin", data);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      localStorage.setItem("user", JSON.stringify(res.data.user.name));
      if (res.data.user.role === "admin") {
        localStorage.setItem("isAuth", JSON.stringify(true));
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section className="h-[500px] ">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center  border border-black rounded-md bg-gray-100">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 ">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 ">
            <h1 className="text-center text-2xl font-bold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>

              <div className="relative mb-6" data-te-input-wrapper-init>
                <label htmlFor="exampleFormControlInput2" className="">
                  Email address
                </label>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                  {...register("email")}
                />
                <p> {errors.email?.message}</p>
              </div>
              <div className="relative mb-6" data-te-input-wrapper-init>
                <label htmlFor="exampleFormControlInput22">Password</label>
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear "
                  id="exampleFormControlInput22"
                  placeholder="Password"
                  {...register("password")}
                />
                <p>
                  {errors.password?.message}
                </p>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block rounded bg-red-500 px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                >
                  Login
                </button>
                <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                  Don't have an account?
                  <Link
                    to="/auth/register"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
