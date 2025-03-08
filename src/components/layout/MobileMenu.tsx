import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Brain } from "lucide-react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-[#87CEEB] transition-colors"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center">
              <img
                src="https://gracious-chaplygin8-gtn6u.dev-2.tempolabs.ai/logo.png"
                alt="Dreamscape Logo"
                className="h-10"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white hover:text-[#87CEEB] transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-6 space-y-6">
            <Link
              to="/"
              className={`text-xl transition-colors ${isActive("/") ? "text-[#87CEEB] font-medium" : "text-white hover:text-[#87CEEB]"}`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/dreamboard"
              className={`text-xl transition-colors ${isActive("/dreamboard") ? "text-[#87CEEB] font-medium" : "text-white hover:text-[#87CEEB]"}`}
              onClick={() => setIsOpen(false)}
            >
              Dream Board
            </Link>
            <Link
              to="/tasks"
              className={`text-xl transition-colors ${isActive("/tasks") ? "text-[#87CEEB] font-medium" : "text-white hover:text-[#87CEEB]"}`}
              onClick={() => setIsOpen(false)}
            >
              Tasks
            </Link>
            <Link
              to="/nano"
              className={`text-xl transition-colors flex items-center ${isActive("/nano") ? "text-[#87CEEB] font-medium" : "text-white hover:text-[#87CEEB]"}`}
              onClick={() => setIsOpen(false)}
            >
              <Brain size={20} className="mr-2" />
              Nano AI
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
