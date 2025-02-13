import {FolderKanban, LogOut, UserRoundPen, Zap} from "lucide-react";
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
          <Link to="/" className="btn btn-ghost text-xl">
            ArtifyAI <span className="animate-pulse">🪄</span>
          </Link>
        </div>

        <div className="navbar-end gap-4">
          <div className="tooltip tooltip-bottom">
            <div className="tooltip-content">
              <div className="animate-bounce text-orange-500 -rotate-3 font-black p-0.5">Get More
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
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
              <div
                  className="bg-neutral text-neutral-content w-20 rounded-full ring-error ring-offset-base-100 ring ring-offset-2">
                <span className="text-base font-semibold">{user?.name[0].toUpperCase()}</span>
              </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-2 w-48 p-2 shadow">
              <li>
                <Link to="" className="justify-between text-sm font-medium">
                  Profile<UserRoundPen className="w-5 h-5"/>
                </Link>
              </li>
              <li>
                <Link to="" className="justify-between text-sm font-medium">
                  Art Library<FolderKanban className="w-5 h-5"/>
                </Link>
              </li>
              <li>
                <button className="text-error justify-between text-sm font-medium" onClick={handleSignOut}>
                  Logout<LogOut className="w-5 h-5"/>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>
  )
}