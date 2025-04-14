import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/userApi";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate("/users/details");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto flex h-screen">
      <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-2xl font-semibold">SignUp</h3>
        <FormRow>
          <label>Name</label>
          <Input {...register("name", { required: true })} />
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
    </div>
  );
}

export default SignUp;
