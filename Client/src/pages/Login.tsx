import { LoginSchema, loginSchema } from "../schemas/auth";
import { login } from "../services/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { RootContext } from "../providers/rootContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const rootContext = useContext(RootContext);
  const navigator = useNavigate();
  const loginMutation = useMutation(login);

  const onSubmit = async (loginData: LoginSchema) => {
    loginMutation.mutateAsync(loginData, {
      onSuccess: async (response) => {
        const token = await response?.json();
        rootContext?.setToken(token);
        if (token != null) {
          localStorage.setItem("token", token);
        }
        navigator("/Objectives");
      },
    });
  };
  return (
    <div className=" flex text-white  bg-gray-800 w-[100vw] h-[100vh] justify-center items-center">
      <form className="flex flex-col bg-gray-700 border rounded justify-center items-center p-4 w-[25vw]">
        <h1 className="text-2xl mb-8">Intra in cont</h1>
        <label>Email</label>
        <input type="text" className="text-black" {...register("email")} />
        {errors?.email?.message && <p className="text-red-500">{errors?.email?.message}</p>}
        <label>Password</label>
        <input type="password" className="text-black" {...register("password")} />
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
