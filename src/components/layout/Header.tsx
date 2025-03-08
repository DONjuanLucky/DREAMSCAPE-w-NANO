import { Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-black p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img
          src="https://gracious-chaplygin8-gtn6u.dev-2.tempolabs.ai/logo.png"
          alt="Dreamscape Logo"
          className="h-12 md:h-16"
        />
      </Link>
      <nav className="hidden md:flex space-x-6">
        <Link
          to="/"
          className={`transition-colors ${isActive("/") ? "text-[#87CEEB] font-medium" : "text-white hover:text-[#87CEEB]"}`}
        >
          Dashboard
        </Link>
        <Link
          to="/dreamboard"
          className={`transition-colors ${isActive("/dreamboard") ? "text-[#87CEEB] font-medium" : "text-white hover:text-[#87CEEB]"}`}
        >
          Dream Board
        </Link>
        <Link
          to="/tasks"
          className={`transition-colors ${isActive("/tasks") ? "text-[#87CEEB] font-medium" : "text-white hover:text-[#87CEEB]"}`}
        >
          Tasks
        </Link>
        <Link
          to="/nano"
          className={`transition-colors flex items-center ${isActive("/nano") ? "text-[#87CEEB] font-medium" : "text-white hover:text-[#87CEEB]"}`}
        >
          <Brain size={16} className="mr-1.5" />
          Nano AI
        </Link>
      </nav>
      <MobileMenu />
    </header>
  );
};

export default Header;
