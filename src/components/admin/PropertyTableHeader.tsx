
import { ChevronDown, ChevronUp } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PropertyTableHeaderProps {
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
}

const PropertyTableHeader = ({ sortField, sortDirection, handleSort }: PropertyTableHeaderProps) => {
  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronDown size={16} className="opacity-50" />;
    return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[80px]">
          <button 
            className="flex items-center" 
            onClick={() => handleSort("id")}
          >
            ID <SortIcon field="id" />
          </button>
        </TableHead>
        <TableHead>
          <button 
            className="flex items-center" 
            onClick={() => handleSort("title")}
          >
            Title <SortIcon field="title" />
          </button>
        </TableHead>
        <TableHead className="hidden md:table-cell">
          <button 
            className="flex items-center" 
            onClick={() => handleSort("location")}
          >
            Location <SortIcon field="location" />
          </button>
        </TableHead>
        <TableHead className="hidden md:table-cell">
          <button 
            className="flex items-center" 
            onClick={() => handleSort("price")}
          >
            Price (₹) <SortIcon field="price" />
          </button>
        </TableHead>
        <TableHead className="hidden lg:table-cell">
          <button 
            className="flex items-center" 
            onClick={() => handleSort("roomType")}
          >
            Room Type <SortIcon field="roomType" />
          </button>
        </TableHead>
        <TableHead className="hidden lg:table-cell">
          <button 
            className="flex items-center" 
            onClick={() => handleSort("isFeatured")}
          >
            Featured <SortIcon field="isFeatured" />
          </button>
        </TableHead>
        <TableHead className="w-[150px] text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PropertyTableHeader;
