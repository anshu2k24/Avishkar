
import { Check, Edit, Image, Trash2, X } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface PropertyRowProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: number;
    roomType: string;
    isFeatured: boolean;
    image?: string;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const PropertyTableRow = ({ property, onEdit, onDelete }: PropertyRowProps) => {
  return (
    <TableRow key={property.id}>
      <TableCell className="font-medium">{property.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md overflow-hidden shrink-0">
            {property.image ? (
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
            ) : (
              <Image size={32} className="text-gray-400" />
            )}
          </div>
          <span className="line-clamp-1">{property.title}</span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{property.location}</TableCell>
      <TableCell className="hidden md:table-cell">₹{property.price}</TableCell>
      <TableCell className="hidden lg:table-cell capitalize">{property.roomType}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {property.isFeatured ? (
          <Check size={18} className="text-green-500" />
        ) : (
          <X size={18} className="text-gray-400" />
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(property.id)}
            title="Edit"
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-red-500 border-red-200 hover:bg-red-50"
            onClick={() => onDelete(property.id)}
            title="Delete"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default PropertyTableRow;
