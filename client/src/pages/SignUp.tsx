import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import Label from "../ui/Label";
import { createUser } from "../api/services/userApi";
import Row from "../ui/Row";

function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<{
        name: string;
        username: string;
        email: string;
        password: string;
    }>();

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            navigate("/login");
        },
        onError: (error) => {
            console.error("Login error:", error.message);
        },
    });

    const onSubmit = (data: {
        name: string;
        username: string;
        email: string;
        password: string;
    }) => {
        mutation.mutate(data);
    };


    return (
        <div className="dark:bg-neutral-950 flex h-screen flex-col items-center justify-center">
            <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="dark:text-white text-2xl font-semibold mb-4">SignUp</h3>
                <Row>
                    <Label label="Name" />
                    <Input {...register("name", { required: true })} />
                </Row>

                <Row>
                    <Label label="Username" />
                    <Input {...register("username", { required: true })} />
                </Row>

                <Row>
                    <Label label="Email" />
                    <Input type="email" {...register("email", { required: true })} />
                </Row>

                <Row>
                    <Label label="Password" />
                    <Input
                        type="password"
                        {...register("password", { required: true })}
                    />
                </Row>

                <Button type="submit" btn="primary" className="w-full mt-4">
                    <span className="font-medium">Sign Up</span>
                </Button>
            </form>

            <Link
                to={"/login"}
                className="text-brand-500 dark:text-brand-300 hover:underline active:text-brand-500 mt-4"
            >
                Already have an account? Login!
            </Link>
        </div>
    );
}

export default SignUp;
