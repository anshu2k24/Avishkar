
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Database, Save, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import mongoDBService from "@/server/mongodb";

const MongoDBConfig = () => {
  const [apiKey, setApiKey] = useState("");
  const [databaseName, setDatabaseName] = useState("dwellnest");
  const [isConnected, setIsConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if already connected
    const status = mongoDBService.getAPIKeyStatus();
    if (status.hasKey) {
      setApiKey("****************************************");
      if (status.isDatabaseSelected) {
        setDatabaseName(localStorage.getItem('mongoDBDatabaseName') || "dwellnest");
      }
      
      if (mongoDBService.isInitialized()) {
        setIsConnected(true);
      }
    }
  }, []);

  const handleSave = async () => {
    if (!apiKey || apiKey === "****************************************") {
      toast({
        title: "Error",
        description: "Please enter a valid MongoDB API key",
        variant: "destructive",
      });
      return;
    }

    if (!databaseName) {
      toast({
        title: "Error",
        description: "Please enter a database name",
        variant: "destructive",
      });
      return;
    }

    try {
      const connected = await mongoDBService.initialize({
        apiKey,
        databaseName,
      });

      if (connected) {
        setIsConnected(true);
        toast({
          title: "Success",
          description: "Connected to MongoDB successfully",
        });
        setIsOpen(false);
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to MongoDB with the provided credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while connecting to MongoDB",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={isConnected ? "outline" : "default"}
          className={isConnected ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" : ""}
        >
          <Database size={16} className="mr-2" />
          {isConnected ? "MongoDB Connected" : "Configure MongoDB"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>MongoDB Configuration</DialogTitle>
          <DialogDescription>
            Enter your MongoDB connection details to sync PG property data with your database.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="apiKey" className="text-right text-sm font-medium col-span-1">
              API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter MongoDB API Key"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="database" className="text-right text-sm font-medium col-span-1">
              Database
            </label>
            <Input
              id="database"
              value={databaseName}
              onChange={(e) => setDatabaseName(e.target.value)}
              placeholder="Database Name"
              className="col-span-3"
            />
          </div>
          <div className="text-sm text-gray-500 mt-2">
            <p>Note: You will need to add your actual MongoDB connection string later. This configuration is for demonstration purposes.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            <X size={16} className="mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MongoDBConfig;
