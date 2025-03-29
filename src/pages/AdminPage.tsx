
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPropertyForm from "@/components/admin/AdminPropertyForm";
import AdminPropertyList from "@/components/admin/AdminPropertyList";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("list");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage PG properties and view statistics
            </p>
          </div>

          <Tabs defaultValue="list" onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="list">Properties List</TabsTrigger>
              <TabsTrigger value="add">Add New Property</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <AdminPropertyList />
            </TabsContent>
            
            <TabsContent value="add">
              <AdminPropertyForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
