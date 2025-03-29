
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { 
  Star, 
  MapPin, 
  Users, 
  Wifi, 
  Wind, 
  Coffee, 
  Car, 
  Check, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(properties[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    // Find the property with the matching ID
    const foundProperty = properties.find(p => p.id === Number(id));
    if (foundProperty) {
      setProperty(foundProperty);
    }
    // Ideally we'd redirect to a 404 page if property not found
  }, [id]);
  
  // Generate multiple images from the single property image
  const images = [
    property.image,
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1624026676760-53603406ac94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ];
  
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handleSaveProperty = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Property Removed" : "Property Saved",
      description: isSaved ? "This property has been removed from your saved list" : "This property has been added to your saved list",
      duration: 3000,
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Property link has been copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pb-16">
        {/* Property Images */}
        <div className="bg-gray-900">
          <div className="container-custom py-6">
            <div className="flex items-center justify-between mb-4">
              <Link to="/pg-list" className="flex items-center text-white hover:text-pgblue-200 transition">
                <ChevronLeft size={20} className="mr-1" />
                Back to Results
              </Link>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-pgblue-200 hover:bg-white/10"
                  onClick={handleShare}
                >
                  <Share2 size={18} className="mr-2" />
                  Share
                </Button>
                <Button 
                  variant="ghost" 
                  className={`${isSaved ? 'text-pgblue-200' : 'text-white'} hover:text-pgblue-200 hover:bg-white/10`}
                  onClick={handleSaveProperty}
                >
                  <Heart size={18} className={`mr-2 ${isSaved ? 'fill-pgblue-200' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[16/9] overflow-hidden rounded-lg">
                <img 
                  src={images[activeImageIndex]} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                onClick={handlePrevImage}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                onClick={handleNextImage}
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${
                      index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex overflow-x-auto space-x-3 mt-3 pb-2 scrollbar-none">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-24 h-16 rounded overflow-hidden ${
                    index === activeImageIndex ? 'ring-2 ring-pgblue-400' : 'opacity-70'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Property Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                    <div className="flex items-center mt-2 text-gray-600">
                      <MapPin size={18} className="mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold text-pgblue-600">₹{property.price.toLocaleString()}<span className="text-gray-600 text-lg font-normal">/month</span></div>
                    <div className="flex items-center mt-1 bg-pgblue-100 px-2 py-1 rounded text-pgblue-700">
                      <Star size={16} fill="#1E3A8A" className="mr-1" />
                      <span className="font-medium">{property.rating} Rating</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  {property.isFeatured && (
                    <Badge className="bg-pgblue-500">Featured</Badge>
                  )}
                  <Badge variant="outline" className="border-gray-300 text-gray-700">
                    <Users size={14} className="mr-1" /> 
                    {property.roomType}
                  </Badge>
                  {property.hasWifi && (
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      <Wifi size={14} className="mr-1" /> 
                      WiFi
                    </Badge>
                  )}
                  {property.hasAC && (
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      <Wind size={14} className="mr-1" /> 
                      AC
                    </Badge>
                  )}
                  {property.hasFood && (
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      <Coffee size={14} className="mr-1" /> 
                      Food
                    </Badge>
                  )}
                  {property.hasParking && (
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      <Car size={14} className="mr-1" /> 
                      Parking
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Property Description */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
              
              {/* Amenities */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={18} className="text-green-500 mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location Map */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
                  {/* Placeholder for actual map */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <MapPin size={48} className="text-pgblue-500 mx-auto mb-2" />
                      <div className="text-gray-600 font-medium">{property.location}</div>
                      <p className="text-gray-500 text-sm">Map view would appear here</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reviews Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                
                <div className="flex items-center mb-6">
                  <div className="bg-pgblue-100 text-pgblue-700 font-bold text-2xl rounded-lg p-3 mr-4">
                    {property.rating}
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < Math.floor(property.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">Based on 24 reviews</p>
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Priya S.",
                      date: "2 months ago",
                      rating: 5,
                      comment: "Excellent PG with great amenities. The food is delicious and the rooms are clean. Staff is very helpful and cooperative."
                    },
                    {
                      name: "Rahul M.",
                      date: "3 months ago",
                      rating: 4,
                      comment: "Good place to stay. Nice location with all basic amenities. WiFi is fast and reliable. The only issue was occasional water shortage."
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="bg-pgblue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-medium mr-3">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <p className="text-gray-500 text-sm">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar - Booking Widget */}
            <div className="lg:w-1/3 order-first lg:order-last">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Book This PG</h2>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Move-in Date</label>
                  <input 
                    type="date" 
                    className="input-primary"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Duration of Stay</label>
                  <select className="input-primary">
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Room Preference</label>
                  <select className="input-primary">
                    <option value="single">Single Room</option>
                    <option value="double">Double Sharing</option>
                    <option value="triple">Triple Sharing</option>
                  </select>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Monthly Rent</span>
                    <span className="font-medium">₹{property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Security Deposit</span>
                    <span className="font-medium">₹{(property.price).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">₹1,000</span>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <span className="font-semibold">Total Due Today</span>
                    <span className="font-bold text-xl text-pgblue-600">
                      ₹{(property.price * 2 + 1000).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <Link to={`/book/${property.id}`}>
                  <Button className="w-full bg-pgblue-500 hover:bg-pgblue-600 py-6 text-base">
                    Book Now
                  </Button>
                </Link>
                
                <div className="mt-4 text-sm text-gray-600 text-center">
                  <Bookmark size={16} className="inline mr-1" />
                  Payment is refundable if cancelled within 24 hours
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Contact Owner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PropertyDetailPage;
