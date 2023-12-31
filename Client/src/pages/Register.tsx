import { useForm } from "react-hook-form";
import { registerAccount } from "../services/auth";
import { RegisterSchema } from "../schemas/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

function Register() {
  const { register, handleSubmit } = useForm<RegisterSchema>();
  const navigator = useNavigate();
  const registerMutation = useMutation(registerAccount);

  const onSubmit = async (registerData: RegisterSchema) => {
    registerMutation.mutateAsync(registerData);
    navigator("/Login");
  };

  return (
    <div className="flex text-white bg-gray-800 w-[100vw] h-[100vh] justify-center items-center">
      <form className="flex flex-col bg-gray-700 border rounded justify-center items-center p-4 w-[25vw]">
        <h1 className="text-2xl mb-8">Create account</h1>
        <label>Name</label>
        <input type="text" {...register("name")} />
        <label>Email</label>
        <input type="text" {...register("email")} />
        <label>Password</label>
        <input type="password" {...register("password")} />
        <div>
          <button
            className="bg-blue-400 p-2 mt-8 rounded hover:bg-blue-600"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </button>
        </div>
        <div>
          <button
            className="mt-2"
            onClick={() => {
              navigator("/Login");
            }}
          >
            Go to Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
