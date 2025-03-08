import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import ThemeToggle from "../ui/theme-toggle";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-gray-800 p-4 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="https://gracious-chaplygin8-gtn6u.dev-2.tempolabs.ai/logo.png"
              alt="Dreamscape Logo"
              className="h-8 mr-2"
            />
            <span className="text-[#87CEEB] font-semibold">
              Dreamscape UNLMTD
            </span>
          </div>

          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/dreamboard"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Dream Board
            </Link>
            <Link
              to="/tasks"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Tasks
            </Link>
            <Link
              to="/nano"
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <Brain size={12} className="mr-1" />
              Nano AI
            </Link>
          </div>

          <div className="mt-4 md:mt-0">
            <ThemeToggle />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 mt-2 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Dreamscape UNLMTD by Infinity House.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
