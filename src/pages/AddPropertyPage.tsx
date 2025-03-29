
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MapPin, 
  Camera, 
  Upload, 
  Info, 
  Wifi, 
  Wind, 
  Coffee, 
  Car, 
  Trash,
  Plus
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    price: "",
    roomType: "single",
    amenities: {
      wifi: false,
      ac: false,
      food: false,
      parking: false,
      tv: false,
      laundry: false,
      cleaning: false,
      furniture: false,
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [amenity]: checked
      }
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limit to max 5 images
      const newImages = [...images, ...filesArray].slice(0, 5);
      setImages(newImages);
      
      // Generate preview URLs
      const newImagePreviewUrls = newImages.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(newImagePreviewUrls);
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newImagePreviewUrls = [...imagePreviewUrls];
    URL.revokeObjectURL(newImagePreviewUrls[index]);
    newImagePreviewUrls.splice(index, 1);
    setImagePreviewUrls(newImagePreviewUrls);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title || !formData.description || !formData.address || !formData.city || !formData.price) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (images.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image of your property",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would upload the data to a backend
    toast({
      title: "Property Listed Successfully",
      description: "Your property has been submitted for review",
      duration: 3000,
    });
    
    navigate("/");
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">List Your PG Property</h1>
              <p className="text-gray-600 mt-2">
                Fill out the form below to add your property to our marketplace
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Info size={20} className="mr-2 text-pgblue-500" />
                    Basic Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Property Title *
                      </label>
                      <input 
                        type="text" 
                        name="title"
                        placeholder="e.g. Deluxe PG Accommodation Near Tech Park" 
                        className="input-primary"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Description *
                      </label>
                      <textarea 
                        name="description"
                        rows={4} 
                        placeholder="Describe your property, including the highlights and amenities" 
                        className="input-primary resize-none"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Location Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <MapPin size={20} className="mr-2 text-pgblue-500" />
                    Location
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Full Address *
                      </label>
                      <input 
                        type="text" 
                        name="address"
                        placeholder="Enter the complete address" 
                        className="input-primary"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        City *
                      </label>
                      <select 
                        name="city"
                        className="input-primary"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select City</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Pune">Pune</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Monthly Rent (₹) *
                      </label>
                      <input 
                        type="number" 
                        name="price"
                        placeholder="e.g. 10000" 
                        className="input-primary"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Room Type *
                      </label>
                      <select 
                        name="roomType"
                        className="input-primary"
                        value={formData.roomType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="single">Single Room</option>
                        <option value="double">Double Sharing</option>
                        <option value="triple">Triple Sharing</option>
                        <option value="multiple">Multiple Options Available</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="wifi" 
                          checked={formData.amenities.wifi}
                          onCheckedChange={(checked) => 
                            handleAmenityChange("wifi", checked as boolean)
                          }
                        />
                        <label htmlFor="wifi" className="text-sm font-medium flex items-center">
                          <Wifi size={16} className="mr-2 text-gray-500" />
                          WiFi
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="ac" 
                          checked={formData.amenities.ac}
                          onCheckedChange={(checked) => 
                            handleAmenityChange("ac", checked as boolean)
                          }
                        />
                        <label htmlFor="ac" className="text-sm font-medium flex items-center">
                          <Wind size={16} className="mr-2 text-gray-500" />
                          AC
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="food" 
                          checked={formData.amenities.food}
                          onCheckedChange={(checked) => 
                            handleAmenityChange("food", checked as boolean)
                          }
                        />
                        <label htmlFor="food" className="text-sm font-medium flex items-center">
                          <Coffee size={16} className="mr-2 text-gray-500" />
                          Food Included
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="parking" 
                          checked={formData.amenities.parking}
                          onCheckedChange={(checked) => 
                            handleAmenityChange("parking", checked as boolean)
                          }
                        />
                        <label htmlFor="parking" className="text-sm font-medium flex items-center">
                          <Car size={16} className="mr-2 text-gray-500" />
                          Parking
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tv" 
                          checked={formData.amenities.tv}
                          onCheckedChange={(checked) => 
                            handleAmenityChange("tv", checked as boolean)
                          }
                        />
                        <label htmlFor="tv" className="text-sm font-medium">
                          TV
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="laundry" 
                          checked={formData.amenities.laundry}
                          onCheckedChange={(checked) => 
                            handleAmenityChange("laundry", checked as boolean)
                          }
                        />
                        <label htmlFor="laundry" className="text-sm font-medium">
                          Laundry
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="cleaning" 
                          checked={formData.amenities.cleaning}
                          onCheckedChange={(checked) => 
                            handleAmenityChange("cleaning", checked as boolean)
                          }
                        />
                        <label htmlFor="cleaning" className="text-sm font-medium">
                          Cleaning
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="furniture" 
                          checked={formData.amenities.furniture}
                          onCheckedChange={(checked) => 
                            handleAmenityChange("furniture", checked as boolean)
                          }
                        />
                        <label htmlFor="furniture" className="text-sm font-medium">
                          Furnished
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image Upload */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Camera size={20} className="mr-2 text-pgblue-500" />
                    Property Images
                  </h2>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-2">
                      Upload high-quality images of your property (max 5 images)
                    </p>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <Upload size={36} className="text-gray-400 mb-2" />
                        <p className="text-gray-600">
                          Drag & drop your images here, or click to browse
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-4"
                          onClick={() => document.getElementById("image-upload")?.click()}
                        >
                          <Plus size={16} className="mr-2" />
                          Add Images
                        </Button>
                      </label>
                    </div>
                  </div>
                  
                  {/* Image Previews */}
                  {imagePreviewUrls.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden group">
                          <img
                            src={url}
                            alt={`Property Image ${index + 1}`}
                            className="w-full h-24 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              className="text-white bg-red-500 rounded-full p-1"
                              onClick={() => removeImage(index)}
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-pgblue-500 hover:bg-pgblue-600">
                    Submit Property
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AddPropertyPage;
