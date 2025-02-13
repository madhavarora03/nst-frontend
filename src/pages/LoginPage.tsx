import {Link, useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginFormData, loginValidationSchema} from "../schemas/login.ts";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginValidationSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const {signIn} = useAuth();

  const onSubmit = async ({identifier, password}: LoginFormData) => {
    await signIn!({identifier, password});
    navigate("/");
  };

  return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content w-full">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Login Now!</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  <label className="fieldset-label" htmlFor="identifier">Email or Username</label>
                  <input
                      className={`input focus:outline-none ${errors.identifier && "border-error"}`}
                      placeholder="Enter your email or username"
                      id="identifier"
                      {...register("identifier")}
                  />
                  {errors.identifier && <p className="text-error">{errors.identifier.message}</p>}

                  <label className="fieldset-label" htmlFor="password">Password</label>
                  <input
                      type="password"
                      className={`input focus:outline-none ${errors.password && "border-error"}`}
                      placeholder="Enter your password"
                      id="password"
                      {...register("password")}
                  />
                  {errors.password && <p className="text-error">{errors.password.message}</p>}

                  <div><Link to="" className="link link-hover">Forgot password?</Link></div>
                  <button type="submit" className="btn btn-neutral my-4" disabled={!isValid}>Login</button>
                  <div className="text-base">New user? <Link to="/register" className="link link-hover link-info">Register
                    Now!</Link></div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
