
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pgblue-800 text-white pt-12 pb-8">
      <div className="container-custom">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Roomigo</h3>
            <p className="text-gray-300 mb-4">
             Find the best PGs nearby with detailed listings and real-time availability.Compare options based on price, amenities, and location.
             Make informed decisions with user reviews and ratings.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/pg-list" className="text-gray-300 hover:text-white transition">Explore PGs</Link>
              </li>
              <li>
                <Link to="/add-pg" className="text-gray-300 hover:text-white transition">List Your PG</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition">Login / Signup</Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pg-list?city=bangalore" className="text-gray-300 hover:text-white transition">Bangalore</Link>
              </li>
              <li>
                <Link to="/pg-list?city=delhi" className="text-gray-300 hover:text-white transition">Delhi</Link>
              </li>
              <li>
                <Link to="/pg-list?city=mumbai" className="text-gray-300 hover:text-white transition">Mumbai</Link>
              </li>
              <li>
                <Link to="/pg-list?city=pune" className="text-gray-300 hover:text-white transition">Pune</Link>
              </li>
              <li>
                <Link to="/pg-list?city=hyderabad" className="text-gray-300 hover:text-white transition">Hyderabad</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300 cursor-pointer">Dayananda Sagar College of Engineering, Bangalore, India</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">+91 987xxxxxxx</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={20} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300 cursor-pointer">contact@roomigo.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Roomigo. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-400 text-sm hover:text-white transition">
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
