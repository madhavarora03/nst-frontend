import {Zap} from "lucide-react";
import {Link, useNavigate} from "react-router";
import useAuth from "../hooks/useAuth.tsx";

export default function Header() {
  const {user, signOut} = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut!();
    navigate("/login");
  }
  return (
      <header className="navbar bg-primary text-primary-content shadow-sm">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
        </div>

        <div className="navbar-end gap-4">
          <div className="tooltip tooltip-bottom">
            <div className="tooltip-content">
              <div className="animate-bounce text-orange-500 -rotate-3 font-black">Get More
                Credits!
              </div>
            </div>
            <Link to=""
                  className="badge badge-accent text-lg font-semibold p-2 rounded-full flex items-center gap-1 hover:cursor-pointer hover:border-black transition-colors duration-200">
              <Zap className="h-4 w-4"/>
              <span>{user?.credits}</span>
            </Link>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
              </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </header>
  )
}