
import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { properties } from "@/data/properties";
import { toast } from "@/hooks/use-toast";
import MongoDBConfig from "./MongoDBConfig";
import PropertyTableHeader from "./PropertyTableHeader";
import PropertyTableRow from "./PropertyTableRow";
import PropertyTableEmpty from "./PropertyTableEmpty";
import PropertySearchBar from "./PropertySearchBar";

const AdminPropertyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof typeof properties[0]>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof typeof properties[0]) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const handleEdit = (id: number) => {
    // In a real app, this would navigate to edit form with property data
    toast({
      title: "Edit Property",
      description: `Editing property ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    // In a real app, this would show a confirmation dialog and then delete
    toast({
      title: "Delete Property",
      description: `Property ID: ${id} would be deleted`,
      variant: "destructive",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Manage Properties</h2>
          <MongoDBConfig />
        </div>
        
        <PropertySearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <PropertyTableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
          />
          <TableBody>
            {sortedProperties.length > 0 ? (
              sortedProperties.map((property) => (
                <PropertyTableRow
                  key={property.id}
                  property={property}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <PropertyTableEmpty />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPropertyList;
