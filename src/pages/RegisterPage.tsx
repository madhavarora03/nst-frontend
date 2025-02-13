import {Link, useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterFormData, registerValidationSchema} from "../schemas/register.ts";
import useAuth from "../hooks/useAuth.tsx";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerValidationSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const {signUp} = useAuth();

  const onSubmit = async ({email, username, name, password}: RegisterFormData) => {
    await signUp!({email, username, name, password});
    navigate("/");
  };

  return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content w-full">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Create Account</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  <label className="fieldset-label" htmlFor="email">Email</label>
                  <input
                      type="email"
                      className={`input focus:outline-none ${errors.email && "border-error"}`}
                      placeholder="Enter your email"
                      id="email"
                      {...register("email")}
                  />
                  {errors.email && <p className="text-error">{errors.email.message}</p>}

                  <label className="fieldset-label" htmlFor="username">Username</label>
                  <input
                      className={`input focus:outline-none ${errors.username && "border-error"}`}
                      placeholder="Enter your username"
                      id="username"
                      {...register("username")}
                  />
                  {errors.username && <p className="text-error">{errors.username.message}</p>}

                  <label className="fieldset-label" htmlFor="name">Name</label>
                  <input
                      className={`input focus:outline-none ${errors.name && "border-error"}`}
                      placeholder="Enter your name"
                      id="name"
                      {...register("name")}
                  />
                  {errors.name && <p className="text-error">{errors.name.message}</p>}

                  <label className="fieldset-label" htmlFor="password">Password</label>
                  <input
                      type="password"
                      className={`input focus:outline-none ${errors.password && "border-error"}`}
                      placeholder="Enter your password"
                      id="password"
                      {...register("password")}
                  />
                  {errors.password && <p className="text-error">{errors.password.message}</p>}

                  <label className="fieldset-label" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                      type="password"
                      className={`input focus:outline-none ${errors.confirmPassword && "border-error"}`}
                      placeholder="Confirm your password"
                      id="confirmPassword"
                      {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && <p className="text-error">{errors.confirmPassword.message}</p>}

                  <button type="submit" className="btn btn-neutral my-4" disabled={!isValid}>
                    Register
                  </button>

                  <div className="text-base">
                    Already have an account?{" "}
                    <Link to="/login" className="link link-hover link-info">Log Back In!</Link>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
