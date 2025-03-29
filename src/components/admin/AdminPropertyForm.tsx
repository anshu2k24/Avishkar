
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Plus,
  Save
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Map component
import PropertyLocationMap from "../maps/PropertyLocationMap";

// Form schema
const propertyFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(1, "City is required"),
  price: z.string().min(1, "Price is required"),
  roomType: z.string(),
  isFeatured: z.boolean().default(false),
  location: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  amenities: z.object({
    wifi: z.boolean().default(false),
    ac: z.boolean().default(false),
    food: z.boolean().default(false),
    parking: z.boolean().default(false),
    tv: z.boolean().default(false),
    laundry: z.boolean().default(false),
    cleaning: z.boolean().default(false),
    furniture: z.boolean().default(false),
  })
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const AdminPropertyForm = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Default: Bangalore

  // Initialize form
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      city: "",
      price: "",
      roomType: "single",
      isFeatured: false,
      location: selectedLocation,
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
    }
  });

  // Update form location when map location changes
  useEffect(() => {
    form.setValue('location', selectedLocation);
  }, [selectedLocation, form]);

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

  const onSubmit = async (data: PropertyFormValues) => {
    if (images.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image of the property",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In real implementation, you'd upload images and submit to MongoDB here
      // const formData = new FormData();
      // images.forEach((image, index) => {
      //   formData.append(`image-${index}`, image);
      // });
      // formData.append('data', JSON.stringify(data));
      // await fetch('/api/property', { method: 'POST', body: formData });
      
      console.log("Form data to be sent to MongoDB:", data);
      console.log("Images to be uploaded:", images);
      
      // Show success message
      toast({
        title: "Property Added",
        description: "Property has been successfully added",
        duration: 3000,
      });
      
      // Reset form
      form.reset();
      setImages([]);
      setImagePreviewUrls([]);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info size={20} className="mr-2 text-pgblue-500" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Deluxe PG Accommodation Near Tech Park" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the property, including highlights and amenities" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Feature this property</FormLabel>
                      <FormDescription>
                        Featured properties appear on the homepage and top of search results
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Location Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin size={20} className="mr-2 text-pgblue-500" />
              Location
            </h2>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter the complete address" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Google Map Integration */}
              <div className="mt-4">
                <FormLabel>Pin Location on Map *</FormLabel>
                <FormDescription className="mb-2">
                  Drag the marker to set the exact location of your property
                </FormDescription>
                <div className="h-[300px] rounded-md overflow-hidden border">
                  <PropertyLocationMap 
                    selectedLocation={selectedLocation} 
                    setSelectedLocation={setSelectedLocation} 
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Latitude: {selectedLocation.lat.toFixed(6)}, Longitude: {selectedLocation.lng.toFixed(6)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Rent (₹) *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g. 10000" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="roomType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single Room</SelectItem>
                        <SelectItem value="double">Double Sharing</SelectItem>
                        <SelectItem value="triple">Triple Sharing</SelectItem>
                        <SelectItem value="multiple">Multiple Options Available</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <FormLabel className="block text-gray-700 font-medium mb-2">
                Amenities
              </FormLabel>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="amenities.wifi"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          id="wifi"
                        />
                      </FormControl>
                      <FormLabel htmlFor="wifi" className="text-sm font-medium flex items-center">
                        <Wifi size={16} className="mr-2 text-gray-500" />
                        WiFi
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.ac"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          id="ac"
                        />
                      </FormControl>
                      <FormLabel htmlFor="ac" className="text-sm font-medium flex items-center">
                        <Wind size={16} className="mr-2 text-gray-500" />
                        AC
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.food"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          id="food"
                        />
                      </FormControl>
                      <FormLabel htmlFor="food" className="text-sm font-medium flex items-center">
                        <Coffee size={16} className="mr-2 text-gray-500" />
                        Food Included
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.parking"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          id="parking"
                        />
                      </FormControl>
                      <FormLabel htmlFor="parking" className="text-sm font-medium flex items-center">
                        <Car size={16} className="mr-2 text-gray-500" />
                        Parking
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.tv"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          id="tv"
                        />
                      </FormControl>
                      <FormLabel htmlFor="tv" className="text-sm font-medium">
                        TV
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.laundry"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          id="laundry"
                        />
                      </FormControl>
                      <FormLabel htmlFor="laundry" className="text-sm font-medium">
                        Laundry
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.cleaning"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          id="cleaning"
                        />
                      </FormControl>
                      <FormLabel htmlFor="cleaning" className="text-sm font-medium">
                        Cleaning
                      </FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.furniture"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          id="furniture"
                        />
                      </FormControl>
                      <FormLabel htmlFor="furniture" className="text-sm font-medium">
                        Furnished
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          
          {/* Image Upload */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Camera size={20} className="mr-2 text-pgblue-500" />
              Property Images
            </h2>
            
            <div className="mb-4">
              <p className="text-gray-600 text-sm mb-2">
                Upload high-quality images of the property (max 5 images)
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
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button 
              type="submit" 
              className="bg-pgblue-500 hover:bg-pgblue-600"
              disabled={isSubmitting}
            >
              <Save size={16} className="mr-2" />
              {isSubmitting ? "Saving..." : "Save Property"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminPropertyForm;
