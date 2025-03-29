
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, MapPin, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./../components/logo/logo.jpg"
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout, isOwner } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky   top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center  justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center  w-[9%] md:w-[5%]  h-[10px]  space-x-2">
            <img src={Logo} alt="" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-pgblue-500 font-medium">
              Home
            </Link>
            <Link to="/pg-list" className="text-gray-700 hover:text-pgblue-500 font-medium">
              Explore
            </Link>
            {currentUser && (
              <Link to="/add-pg" className="text-gray-700 hover:text-pgblue-500 font-medium">
                List Your PG
              </Link>
            )}
            {isOwner && (
              <Link to="/admin" className="text-gray-700 hover:text-pgblue-500 font-medium">
                Admin
              </Link>
            )}
          </div>

          {/* Right Side - Auth & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="flex items-center  space-x-2">
                  <User size={20} className="text-gray-700 border-2 border-black rounded-lg" />
                  <span className="text-gray-700">{currentUser.email?.split('@')[0]}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>

              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-pgblue-500 font-medium">
                  Login
                </Link>
                <Link to="/signup">
                  <Button className="bg-pgblue-500 hover:bg-pgblue-600">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-pgblue-500 font-medium px-2 py-1">
                Home
              </Link>
              <Link to="/pg-list" className="text-gray-700 hover:text-pgblue-500 font-medium px-2 py-1">
                Explore
              </Link>
              {currentUser && (
                <Link to="/add-pg" className="text-gray-700 hover:text-pgblue-500 font-medium px-2 py-1">
                  List Your PG
                </Link>
              )}
              {isOwner && (
                <Link to="/admin" className="text-gray-700 hover:text-pgblue-500 font-medium px-2 py-1">
                  Admin
                </Link>
              )}
              <div className="border-t border-gray-200 my-2"></div>
              
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <User size={20} className="text-gray-700" />
                    <span className="text-gray-700">{currentUser.email?.split('@')[0]}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-2 py-1 text-gray-700 hover:text-pgblue-500 font-medium"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-pgblue-500 font-medium px-2 py-1">
                    Login
                  </Link>
                  <Link to="/signup" className="px-2 py-1">
                    <Button className="w-full bg-pgblue-500 hover:bg-pgblue-600">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
