import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/userApi";
import { Link, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/app/");
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-2xl font-semibold">Login</h3>

        <FormRow>
          <label>Email</label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </FormRow>

        <FormRow>
          <label>Password</label>
          <Input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </FormRow>

        {mutation.isError && (
          <div className="mb-4 text-red-500">{mutation.error.message}</div>
        )}

        <Button
          type="submit"
          className="mt-5 w-full rounded-none"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            "Logging in..."
          ) : (
            <span className="font-medium">Login</span>
          )}
        </Button>
      </form>

      <Link
        to={"/signup"}
        className="text-brand-500 hover:text-brand-600 active:text-brand-800 mt-4"
      >
        Dont have an account? Sign up!
      </Link>
    </div>
  );
}

export default Login;
