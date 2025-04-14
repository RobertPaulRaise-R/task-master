import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/userApi";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Logged In", data);
      navigate("/app/");
    },
    onError: (error) => {
      console.error("Login failed", error.message);
      navigate("/signup");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto flex h-screen">
      <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-2xl font-semibold">Login</h3>
        <FormRow>
          <label>Email</label>
          <Input type="email" {...register("email", { required: true })} />
        </FormRow>

        <FormRow>
          <label>Password</label>
          <Input
            type="password"
            {...register("password", { required: true })}
          />
        </FormRow>

        <Button type="submit" className="mt-5 w-full rounded-none">
          <span className="font-medium">Sign Up</span>
        </Button>
      </form>
    </div>
  );
}

export default Login;
