import {Link, useNavigate} from "react-router";
import {FormEvent, useState} from "react";
import useAuth from "../context/AuthContext.tsx";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const {signIn} = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn!({identifier, password});
    navigate("/");
  }

  return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="carousel carousel-vertical rounded-box h-96">
            <div className="carousel-item h-full">
              <img alt="" src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" />
            </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title text-primary">Login Now!</h2>
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <label className="fieldset-label" htmlFor="identifier">Email or Username</label>
                  <input
                      className="input focus:outline-none"
                      placeholder="Enter your email or username"
                      id="identifier"
                      name="identifier"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                  />
                  <label className="fieldset-label" htmlFor="password">Password</label>
                  <input
                      type="password"
                      className="input focus:outline-none"
                      placeholder="Enter your password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <div><Link to="" className="link link-hover">Forgot password?</Link></div>
                  <button type="submit" className="btn btn-neutral my-4">Login</button>
                  <div className="text-base">New user? <Link to="" className="link link-hover link-info">Register Now!</Link></div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}