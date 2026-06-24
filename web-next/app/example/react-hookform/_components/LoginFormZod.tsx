"use client";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormData, registerSchema, RegisterFormData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
export default function LoginFormZod() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "default@gmail.com",
            password: ""
        }
    });
    const onSubmit = (data: LoginFormData) => {
        alert("Submitted data: " + data.email + ", " + data.password);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email: </label>
                    <input 
                        type="email" 
                        {...register("email")} 
                    />
                    { errors.email && <span>{errors.email.message}</span> }
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        {...register("password", { required: "Password is required" })} 
                    />
                    { errors.password && <span>{errors.password.message}</span> }
                </div>
                <button type="submit" disabled={isSubmitting}>Login</button>
            </form>
        </div>
    );
}