import { LoginSchema, loginSchema } from "../schemas/auth";
import { login } from "../services/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { RootContext } from "../providers/rootContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const rootContext = useContext(RootContext);

  const onSubmit = async (loginData: LoginSchema) => {
    var response = await login(loginData);
    if (response.status === 200) {
      const token = await response.json();
      rootContext?.setToken(token);
      window.location.href = "/Objectives";
    }
  };
  return (
    <div className=" flex bg-gray-800 w-[100vw] h-[100vh] justify-center items-center">
      <form className="flex flex-col bg-gray-700 border rounded justify-center items-start p-4 w-[25vw]">
        <h1 className="text-2xl mb-8">Intra in cont</h1>
        <label>Email</label>
        <input type="text" {...register("email")} />
        {errors?.email?.message && <p className="text-red-500">{errors?.email?.message}</p>}
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors?.password?.message && <p className="text-red-500">{errors?.password?.message}</p>}

        <div>
          <button
            className="bg-blue-400 p-2 mt-8 rounded hover:bg-blue-600"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
