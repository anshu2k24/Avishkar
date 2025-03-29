
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PropertySearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PropertySearchBar = ({ searchTerm, onSearchChange }: PropertySearchBarProps) => {
  return (
    <div className="relative w-full md:w-64">
      <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search properties..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default PropertySearchBar;
