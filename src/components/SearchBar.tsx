
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBar = ({ className = "" }: { className?: string }) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("pg");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/pg-list?location=${location}&type=${propertyType}`);
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 md:p-6 ${className}`}>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Location Input */}
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by city, locality, or area..."
            className="input-primary pl-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Property Type Selector */}
        <div className="md:w-48">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Home size={20} />
            </div>
            <select
              className="input-primary pl-10 appearance-none"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="pg">PG</option>
              <option value="flat">Flat</option>
              <option value="hostel">Hostel</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <Button 
          type="submit" 
          className="bg-pgblue-500 hover:bg-pgblue-600 text-white w-full md:w-auto md:px-8"
        >
          <Search size={20} className="mr-2" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
