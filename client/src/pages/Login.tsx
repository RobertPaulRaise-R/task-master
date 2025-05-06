import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/userApi";
import { useNavigate } from "react-router";

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
      navigate("/app/dashboard");
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto flex h-screen">
      <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
}

export default Login;
