import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/userApi";
import { Link, useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-2xl font-semibold">SignUp</h3>
        <FormRow>
          <label>Name</label>
          <Input {...register("name", { required: true })} />
        </FormRow>

        <FormRow>
          <label>Username</label>
          <Input {...register("username", { required: true })} />
        </FormRow>

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

      <Link
        to={"/login"}
        className="text-brand-500 hover:text-brand-600 active:text-brand-800 mt-4"
      >
        Already have an account? Login!
      </Link>
    </div>
  );
}

export default SignUp;
