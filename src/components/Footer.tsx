import {Link} from "react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
      <footer className="bg-neutral text-neutral-content py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Name */}
          <span className="text-lg font-semibold">&copy; NST-App {year}</span>

          {/* Additional Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="" className="hover:text-primary transition">Privacy Policy</Link>
            <Link to="" className="hover:text-primary transition">Terms of Service</Link>
            <Link to="" className="hover:text-primary transition">Contact</Link>
          </div>
        </div>
      </footer>
  );
}
