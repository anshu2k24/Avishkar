
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { Link } from "react-router-dom";
import { MapPin, Home, Users, Coffee, Car, Wifi, Search, ArrowRight } from "lucide-react";

const HomePage = () => {
  // Get featured properties
  const featuredProperties = properties.filter(prop => prop.isFeatured);

  return (
    <>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Properties Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
                <p className="text-gray-600 mt-2">Explore our handpicked premium PG accommodations</p>
              </div>
              <Link to="/pg-list" className="text-pgblue-600 flex items-center font-medium hover:underline mt-4 md:mt-0">
                View All <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
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
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How DwellNest Works</h2>
              <p className="text-gray-600">Our simple 3-step process helps you find and book your ideal PG accommodation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Search className="w-12 h-12 text-pgblue-500" />,
                  title: "Search",
                  description: "Browse our extensive catalog of verified PG properties across major cities in India."
                },
                {
                  icon: <Home className="w-12 h-12 text-pgblue-500" />,
                  title: "Connect",
                  description: "Connect with property owners directly, schedule visits, and ask questions."
                },
                {
                  icon: <Users className="w-12 h-12 text-pgblue-500" />,
                  title: "Move In",
                  description: "Book your chosen PG, complete the paperwork digitally, and move in hassle-free."
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Cities Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Cities</h2>
              <p className="text-gray-600">Discover PG accommodations in these trending locations</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { city: "Bangalore", count: "2,500+ PGs", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                { city: "Delhi", count: "1,800+ PGs", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                { city: "Mumbai", count: "2,000+ PGs", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                { city: "Pune", count: "1,200+ PGs", image: "https://images.unsplash.com/photo-1558818061-55d83a8b6a25?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                { city: "Hyderabad", count: "1,100+ PGs", image: "https://images.unsplash.com/photo-1626196340145-5769eb62ca4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              ].map((cityData, index) => (
                <Link 
                  to={`/pg-list?city=${cityData.city}`} 
                  key={index}
                  className="relative rounded-lg overflow-hidden group"
                >
                  <div className="aspect-square">
                    <img 
                      src={cityData.image} 
                      alt={cityData.city} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg">{cityData.city}</h3>
                      <p className="text-sm text-gray-200">{cityData.count}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Amenities</h2>
              <p className="text-gray-600">Most of our PG accommodations come with these essential amenities</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Wifi className="w-8 h-8" />, title: "High-Speed WiFi", description: "Stay connected with fast internet access." },
                { icon: <Coffee className="w-8 h-8" />, title: "Meals Included", description: "Enjoy nutritious home-cooked meals." },
                { icon: <Car className="w-8 h-8" />, title: "Parking Space", description: "Safe parking for your vehicles." },
                { icon: <MapPin className="w-8 h-8" />, title: "Prime Locations", description: "Properties near major workplaces." },
              ].map((amenity, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <div className="text-pgblue-500 mb-4">{amenity.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{amenity.title}</h3>
                  <p className="text-gray-600 text-sm">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-pgblue-500 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect PG?</h2>
              <p className="text-xl text-pgblue-100 mb-8">
                Join thousands of satisfied tenants who found their ideal PG accommodation with DwellNest
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/pg-list" className="bg-white text-pgblue-700 hover:bg-pgblue-100 px-8 py-3 rounded-lg shadow-md transition font-medium">
                  Explore Properties
                </Link>
                <Link to="/signup" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg transition font-medium">
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
