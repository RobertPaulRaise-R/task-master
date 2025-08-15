import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import Label from "../ui/Label";
import { loginUser } from "../api/services/userApi";
import Row from "../ui/Row";
import toast from "react-hot-toast";

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
            toast.success("Login successfull");
            navigate("/app");
        },
        onError: () => {
            toast.error("Login failed");
        }
    });

    const onSubmit = (data: { email: string; password: string }) => {
        mutation.mutate(data);
    };

    return (
        <div className="bg-light-50 dark:bg-neutral-950 h-svh flex flex-col items-center justify-center">
            <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="dark:text-white text-2xl font-semibold mb-6">Login</h3>

                <Row>
                    <Label label="Email" />
                    <Input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                        <span className="text-sm text-red-500">{errors.email.message}</span>
                    )}
                </Row>

                <Row>
                    <Label label="Password" />
                    <Input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && (
                        <span className="text-sm text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </Row>

                {mutation.isError && (
                    <div className="mb-4 text-red-500">{mutation.error.message}</div>
                )}

                <Button
                    type="submit"
                    btn="primary"
                    className="mt-5 w-full"
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
                className="text-brand-500 dark:text-brand-300 hover:underline active:text-brand-500 mt-4"
            >
                Dont have an account? Sign up!
            </Link>
        </div>
    );
}

export default Login;
