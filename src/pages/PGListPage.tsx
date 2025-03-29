
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { properties } from "@/data/properties";
import { Wifi, Coffee, Wind, Car, Check, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const PGListPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [hasWifi, setHasWifi] = useState(false);
  const [hasAC, setHasAC] = useState(false);
  const [hasFood, setHasFood] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    const cityFromUrl = searchParams.get("city");
    if (cityFromUrl) {
      setSelectedCity(cityFromUrl);
    }
    
    const locationFromUrl = searchParams.get("location");
    if (locationFromUrl) {
      // This would ideally be a more sophisticated search
    }
  }, [searchParams]);

  useEffect(() => {
    // Apply filters
    let result = [...properties];
    
    // Filter by city
    if (selectedCity) {
      result = result.filter(property => 
        property.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }
    
    // Filter by price range
    result = result.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    
    // Filter by amenities
    if (hasWifi) result = result.filter(property => property.hasWifi);
    if (hasAC) result = result.filter(property => property.hasAC);
    if (hasFood) result = result.filter(property => property.hasFood);
    if (hasParking) result = result.filter(property => property.hasParking);
    
    // Apply sorting
    if (sortOption === "price_low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: featured first, then by rating
      result.sort((a, b) => {
        if (a.isFeatured === b.isFeatured) return b.rating - a.rating;
        return a.isFeatured ? -1 : 1;
      });
    }
    
    setFilteredProperties(result);
  }, [selectedCity, priceRange, hasWifi, hasAC, hasFood, hasParking, sortOption]);

  const handleClearFilters = () => {
    setSelectedCity("");
    setPriceRange([0, 20000]);
    setHasWifi(false);
    setHasAC(false);
    setHasFood(false);
    setHasParking(false);
    setSortOption("featured");
  };

  // Get unique list of cities
  const cities = [...new Set(properties.map(property => property.city))];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect PG</h1>
            <p className="text-gray-600">Browse through our verified PG listings to find your ideal accommodation</p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Mobile Toggle */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="flex items-center"
              >
                <SlidersHorizontal size={18} className="mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              
              <div className="text-sm text-gray-500">
                {filteredProperties.length} properties found
              </div>
            </div>
            
            {/* Filters Sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearFilters}
                    className="text-pgblue-500 hover:text-pgblue-700 p-0 h-auto"
                  >
                    Clear All
                  </Button>
                </div>
                
                {/* City Filter */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">City</h3>
                  <select 
                    className="input-primary"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Price Range (₹)</h3>
                  <Slider
                    defaultValue={[0, 20000]}
                    max={20000}
                    step={500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-6 mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Amenities</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox 
                        id="wifi" 
                        checked={hasWifi} 
                        onCheckedChange={(checked) => setHasWifi(checked === true)}
                      />
                      <label htmlFor="wifi" className="ml-2 text-sm font-medium flex items-center">
                        <Wifi size={16} className="mr-2 text-gray-500" />
                        WiFi
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="ac" 
                        checked={hasAC} 
                        onCheckedChange={(checked) => setHasAC(checked === true)}
                      />
                      <label htmlFor="ac" className="ml-2 text-sm font-medium flex items-center">
                        <Wind size={16} className="mr-2 text-gray-500" />
                        AC
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="food" 
                        checked={hasFood} 
                        onCheckedChange={(checked) => setHasFood(checked === true)}
                      />
                      <label htmlFor="food" className="ml-2 text-sm font-medium flex items-center">
                        <Coffee size={16} className="mr-2 text-gray-500" />
                        Food Included
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="parking" 
                        checked={hasParking} 
                        onCheckedChange={(checked) => setHasParking(checked === true)}
                      />
                      <label htmlFor="parking" className="ml-2 text-sm font-medium flex items-center">
                        <Car size={16} className="mr-2 text-gray-500" />
                        Parking
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Sorting */}
                <div>
                  <h3 className="text-md font-medium mb-3">Sort By</h3>
                  <select 
                    className="input-primary"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Property Listings */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-6 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {filteredProperties.length} Properties Found
                </h2>
                <div className="hidden lg:block">
                  <select 
                    className="input-primary w-48"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
              
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      title={property.title}
                      location={property.location}
                      price={property.price}
                      rating={property.rating}
                      image={property.image}
                      roomType={property.roomType}
                      hasWifi={property.hasWifi}
                      isFeatured={property.isFeatured}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <X size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search filters to find more options</p>
                  <Button onClick={handleClearFilters} className="bg-pgblue-500">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PGListPage;
