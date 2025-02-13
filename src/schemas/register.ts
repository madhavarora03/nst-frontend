import {z} from "zod";

export const registerValidationSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  username: z.string()
      .regex(/^[a-zA-Z0-9-]+$/, "Username can only contain letters, numbers, and dashes (-)")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters")
      .nonempty("Username is required"),
  name: z.string().nonempty("Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  confirmPassword: z.string().nonempty("Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerValidationSchema>;
