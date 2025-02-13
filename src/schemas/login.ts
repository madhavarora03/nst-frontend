import {z} from "zod";

export const loginValidationSchema = z.object({
  identifier: z.string().nonempty("Identifier cannot be empty").superRefine((value, ctx) => {
    if (value.includes("@")) {
      // Validate as an email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid email format",
        });
      }
    } else {
      // Validate as a username (at least 3 letters, only letters, numbers, and dashes)
      if (!/^[a-zA-Z0-9-]+$/.test(value)) {
        ctx.addIssue({
          code: "custom",
          message: "Username can only contain letters, numbers, and dashes (-)",
        });
      }
      if (!/[a-zA-Z]{3,}/.test(value)) {
        ctx.addIssue({
          code: "custom",
          message: "Username must contain at least 3 letters",
        });
      }
    }
  }),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

export type LoginFormData = z.infer<typeof loginValidationSchema>;
