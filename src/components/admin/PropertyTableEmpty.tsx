
import { TableCell, TableRow } from "@/components/ui/table";

const PropertyTableEmpty = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
        No properties found. Try a different search term.
      </TableCell>
    </TableRow>
  );
};

export default PropertyTableEmpty;
