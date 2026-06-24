import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters")
}).refine(
    (data) => data.password === data.confirmPassword, 
    {
        message: "Passwords do not match",
        path: ["confirmPassword"] // add this to show error on confirmPassword field
    }
);
export type RegisterFormData = z.infer<typeof registerSchema>;
// make a compoent RegisterForm
// in _components/RegisterForm.tsx
// use the registerSchema for validation
// in page.tsx create a page for register and use the RegisterForm component
// /example/react-hookform/register-with-zod/page.tsx
// is email is admin@gmail.com and password is admin123 then redirect 
// to /example/react-hookform/login-with-zod else alert invalid credentials"