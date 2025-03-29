
import { Link } from "react-router-dom";
import { Star, MapPin, Wifi, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  roomType: string;
  hasWifi: boolean;
  isFeatured?: boolean;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  rating,
  image,
  roomType,
  hasWifi,
  isFeatured = false,
}: PropertyCardProps) => {
  return (
    <Link to={`/pg/${id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md card-hover">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {isFeatured && (
            <Badge className="absolute top-3 left-3 bg-pgblue-500">
              Featured
            </Badge>
          )}
          <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-lg text-sm font-semibold text-pgblue-700">
            ₹{price.toLocaleString()}/mo
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{title}</h3>
            <div className="flex items-center space-x-1 bg-pgblue-100 px-2 py-1 rounded text-pgblue-700">
              <Star size={14} fill="#1E3A8A" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>

          <div className="flex items-center mt-1 text-gray-500">
            <MapPin size={16} className="mr-1" />
            <p className="text-sm truncate">{location}</p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-600">
                <Users size={16} className="mr-1" />
                <span className="text-sm">{roomType}</span>
              </div>
              {hasWifi && (
                <div className="flex items-center text-gray-600">
                  <Wifi size={16} className="mr-1" />
                  <span className="text-sm">WiFi</span>
                </div>
              )}
            </div>
            <span className="text-pgblue-600 text-sm font-medium hover:underline">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
