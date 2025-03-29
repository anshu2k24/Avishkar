
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Check,
  CreditCard,
  DollarSign,
  MapPin,
  Users,
  Home,
  CalendarDays
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(properties[0]);
  const navigate = useNavigate();

  // Booking state
  const [moveInDate, setMoveInDate] = useState("");
  const [duration, setDuration] = useState("1");
  const [roomType, setRoomType] = useState("single");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    // Find the property with the matching ID
    const foundProperty = properties.find(p => p.id === Number(id));
    if (foundProperty) {
      setProperty(foundProperty);
      setRoomType(foundProperty.roomType.toLowerCase().includes("single") ? "single" : "shared");
    } else {
      // Redirect to 404 if property not found
      navigate("/not-found");
    }
  }, [id, navigate]);

  const getTotalAmount = () => {
    const monthlyRent = property.price;
    const securityDeposit = monthlyRent; // Equal to one month rent
    const serviceFee = 1000;
    
    return monthlyRent + securityDeposit + serviceFee;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!moveInDate) {
      toast({
        title: "Missing Information",
        description: "Please select a move-in date",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would submit to a payment gateway and handle the booking
    toast({
      title: "Booking Confirmed",
      description: "Your booking has been successfully confirmed! Check your email for details.",
      duration: 5000,
    });
    
    navigate("/");
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
              <p className="text-gray-600 mt-2">
                You're just a few steps away from securing your new accommodation
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold mb-6">Booking Details</h2>
                    
                    {/* Move-in Date */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Move-in Date *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Calendar size={20} />
                        </div>
                        <input 
                          type="date" 
                          className="input-primary pl-10"
                          value={moveInDate}
                          onChange={(e) => setMoveInDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Duration */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Duration of Stay
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <CalendarDays size={20} />
                        </div>
                        <select 
                          className="input-primary pl-10"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        >
                          <option value="1">1 Month</option>
                          <option value="3">3 Months</option>
                          <option value="6">6 Months</option>
                          <option value="12">12 Months</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Room Type */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Room Preference
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Home size={20} />
                        </div>
                        <select 
                          className="input-primary pl-10"
                          value={roomType}
                          onChange={(e) => setRoomType(e.target.value)}
                        >
                          <option value="single">Single Room</option>
                          <option value="double">Double Sharing</option>
                          <option value="triple">Triple Sharing</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Payment Method */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                      
                      <div className="space-y-3">
                        <div className="border rounded-lg p-4 cursor-pointer flex items-start space-x-3 transition-all hover:border-pgblue-500 hover:bg-pgblue-50">
                          <input 
                            type="radio" 
                            id="card-payment" 
                            name="payment-method" 
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={() => setPaymentMethod("card")}
                            className="mt-1"
                          />
                          <label htmlFor="card-payment" className="flex-1 cursor-pointer">
                            <div className="flex items-center">
                              <CreditCard size={20} className="mr-2 text-pgblue-500" />
                              <span className="font-medium">Credit/Debit Card</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                              Secure payment via credit or debit card
                            </p>
                          </label>
                        </div>
                        
                        <div className="border rounded-lg p-4 cursor-pointer flex items-start space-x-3 transition-all hover:border-pgblue-500 hover:bg-pgblue-50">
                          <input 
                            type="radio" 
                            id="cash-payment" 
                            name="payment-method" 
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={() => setPaymentMethod("cash")}
                            className="mt-1"
                          />
                          <label htmlFor="cash-payment" className="flex-1 cursor-pointer">
                            <div className="flex items-center">
                              <DollarSign size={20} className="mr-2 text-pgblue-500" />
                              <span className="font-medium">Cash on Arrival</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                              Pay in cash when you arrive at the property
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        className="h-4 w-4 rounded border-gray-300 text-pgblue-500 focus:ring-pgblue-500"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                        I agree to the{" "}
                        <a href="#" className="text-pgblue-600 hover:text-pgblue-700">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-pgblue-600 hover:text-pgblue-700">
                          Cancellation Policy
                        </a>
                      </label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-pgblue-500 hover:bg-pgblue-600 py-6">
                      Confirm Booking
                    </Button>
                  </form>
                </div>
              </div>
              
              {/* Booking Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                  
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex items-center mb-3">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-16 h-16 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-1">{property.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin size={14} className="mr-1" />
                          <span className="truncate">{property.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-1">
                      <Users size={16} className="mr-2" />
                      <span>{property.roomType}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rent</span>
                      <span className="font-medium">₹{property.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="font-medium">₹{property.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium">₹1,000</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Due Today</span>
                      <span className="font-bold text-xl text-pgblue-600">
                        ₹{getTotalAmount().toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex">
                      <Check size={20} className="text-green-500 mr-2 flex-shrink-0" />
                      <div className="text-sm text-green-800">
                        <span className="font-medium">Cancellation Policy:</span>{" "}
                        Free cancellation up to 24 hours before your move-in date.
                      </div>
                    </div>
                  </div>
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

export default BookingPage;
