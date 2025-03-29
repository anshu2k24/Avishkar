
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-pattern"></div>
      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight animate-slide-in">
            Find Your Perfect <span className="text-pgblue-200">PG Home</span> in the City
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 animate-slide-in" style={{ animationDelay: "100ms" }}>
            Browse verified PG accommodations, connect with owners, and book your stay hassle-free 
            with the most trusted platform in India.
          </p>
          <div className="flex flex-wrap gap-4 mb-12 animate-slide-in" style={{ animationDelay: "200ms" }}>
            <Link to="/pg-list" className="btn-primary inline-flex items-center">
              Explore PGs <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/add-pg" className="btn-secondary inline-flex items-center">
              List Your PGs
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="animate-slide-in" style={{ animationDelay: "300ms" }}>
          <SearchBar />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
          {[
            { count: "10,000+", label: "PG Listings" },
            { count: "50+", label: "Cities" },
            { count: "25,000+", label: "Happy Tenants" },
            { count: "4.8/5", label: "User Rating" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="animate-slide-in" 
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl font-bold">{stat.count}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
