
export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  roomType: string;
  amenities: string[];
  hasWifi: boolean;
  hasAC: boolean;
  hasFood: boolean;
  hasParking: boolean;
  isFeatured: boolean;
  city: string;
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Premium PG Near Tech Park",
    location: "Koramangala, Bangalore",
    price: 12000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Modern PG accommodation with all amenities near major tech parks. Single and shared rooms available. Food, WiFi, AC, and cleaning services included.",
    roomType: "Single Room",
    amenities: ["WiFi", "AC", "Food", "Laundry", "Cleaning", "TV"],
    hasWifi: true,
    hasAC: true,
    hasFood: true,
    hasParking: true,
    isFeatured: true,
    city: "Bangalore"
  },
  {
    id: 2,
    title: "Deluxe Co-living Space",
    location: "HSR Layout, Bangalore",
    price: 15000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Premium co-living space with modern amenities and private rooms. Includes WiFi, AC, meals, housekeeping, community events, and 24/7 security.",
    roomType: "Private Room",
    amenities: ["WiFi", "AC", "Food", "Gym", "Recreation Room", "Housekeeping"],
    hasWifi: true,
    hasAC: true,
    hasFood: true,
    hasParking: false,
    isFeatured: true,
    city: "Bangalore"
  },
  {
    id: 3,
    title: "Budget Friendly PG",
    location: "BTM Layout, Bangalore",
    price: 8000,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Affordable PG with basic amenities. Shared rooms available. Includes WiFi, food, and common areas. Ideal for students and working professionals on a budget.",
    roomType: "Shared Room",
    amenities: ["WiFi", "Food", "Common Area", "Laundry"],
    hasWifi: true,
    hasAC: false,
    hasFood: true,
    hasParking: false,
    isFeatured: false,
    city: "Bangalore"
  },
  {
    id: 4,
    title: "Women's PG Near Metro",
    location: "Indiranagar, Bangalore",
    price: 10500,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Ladies PG accommodation with premium facilities. Secure environment with CCTV. Rooms with attached bathrooms. All meals provided.",
    roomType: "Single Room",
    amenities: ["WiFi", "AC", "Food", "Laundry", "Security"],
    hasWifi: true,
    hasAC: true,
    hasFood: true,
    hasParking: false,
    isFeatured: false,
    city: "Bangalore"
  },
  {
    id: 5,
    title: "Luxury PG with Terrace",
    location: "Powai, Mumbai",
    price: 18000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "High-end PG accommodation with terrace garden and premium amenities. Private rooms with attached bathrooms. Premium dining options.",
    roomType: "Private Room",
    amenities: ["WiFi", "AC", "Food", "Gym", "Terrace Garden", "TV"],
    hasWifi: true,
    hasAC: true,
    hasFood: true,
    hasParking: true,
    isFeatured: true,
    city: "Mumbai"
  },
  {
    id: 6,
    title: "Working Professional PG",
    location: "Andheri, Mumbai",
    price: 14000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "PG designed for working professionals with quiet zones and work areas. Single and double occupancy available. Close to business districts and metro station.",
    roomType: "Single Room",
    amenities: ["WiFi", "AC", "Food", "Work Desk", "Power Backup"],
    hasWifi: true,
    hasAC: true,
    hasFood: true,
    hasParking: false,
    isFeatured: false,
    city: "Mumbai"
  },
  {
    id: 7,
    title: "Centrally Located PG",
    location: "Connaught Place, Delhi",
    price: 13500,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "PG accommodation in the heart of Delhi with easy access to markets, offices, and transportation. Furnished rooms with all basic amenities.",
    roomType: "Double Sharing",
    amenities: ["WiFi", "AC", "Food", "Housekeeping", "Security"],
    hasWifi: true,
    hasAC: true,
    hasFood: true,
    hasParking: false,
    isFeatured: false,
    city: "Delhi"
  },
  {
    id: 8,
    title: "Student Housing Near University",
    location: "North Campus, Delhi",
    price: 9000,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Affordable PG options for students near Delhi University. Quiet environment perfect for studying. Shared rooms with academic facilities.",
    roomType: "Triple Sharing",
    amenities: ["WiFi", "Food", "Study Area", "Library", "Common Room"],
    hasWifi: true,
    hasAC: false,
    hasFood: true,
    hasParking: false,
    isFeatured: false,
    city: "Delhi"
  }
];
