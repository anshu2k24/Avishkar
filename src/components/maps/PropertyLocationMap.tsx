
import { useEffect, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import googleMapsService from "@/server/maps/googleMapsService";

interface PropertyLocationMapProps {
  selectedLocation: { lat: number; lng: number };
  setSelectedLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}

const PropertyLocationMap = ({ selectedLocation, setSelectedLocation }: PropertyLocationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string | null>(
    googleMapsService.getApiKey()
  );

  const loadGoogleMapsScript = (apiKey: string) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => initializeMap();
    script.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load Google Maps. Please check your API key.",
        variant: "destructive",
      });
    };
    document.body.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Initialize the map
    const map = new window.google.maps.Map(mapRef.current, {
      center: selectedLocation,
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
    });

    // Add a marker
    const marker = new window.google.maps.Marker({
      position: selectedLocation,
      map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    });

    // Handle marker drag events
    marker.addListener("dragend", () => {
      const position = marker.getPosition();
      if (position) {
        setSelectedLocation({
          lat: position.lat(),
          lng: position.lng(),
        });
      }
    });

    // Click to place marker
    map.addListener("click", (e: google.maps.MapMouseEvent) => {
      const position = e.latLng;
      if (position) {
        marker.setPosition(position);
        setSelectedLocation({
          lat: position.lat(),
          lng: position.lng(),
        });
      }
    });

    // Add search box
    const input = document.createElement("input");
    input.className = "map-search-input absolute top-2 left-2 right-2 z-10 rounded-md border border-input bg-white px-3 py-2 text-sm shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
    input.placeholder = "Search for a location";
    mapRef.current.appendChild(input);

    const searchBox = new window.google.maps.places.SearchBox(input);
    
    // Bias search results to current map viewport
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    // Listen for search box selections
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;

      const place = places[0];
      if (!place.geometry || !place.geometry.location) return;

      // Center map on selected place
      map.setCenter(place.geometry.location);
      map.setZoom(15);
      
      // Update marker position
      marker.setPosition(place.geometry.location);
      
      // Update selected location
      setSelectedLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });

    setMapLoaded(true);
  };

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get("apiKey") as string;
    
    if (!apiKey) {
      toast({
        title: "Error",
        description: "API key is required",
        variant: "destructive",
      });
      return;
    }
    
    googleMapsService.initialize(apiKey);
    setGoogleMapsApiKey(apiKey);
    loadGoogleMapsScript(apiKey);
  };

  useEffect(() => {
    if (googleMapsApiKey) {
      if (!window.google) {
        loadGoogleMapsScript(googleMapsApiKey);
      } else {
        initializeMap();
      }
    }
  }, [googleMapsApiKey]);

  if (!googleMapsApiKey) {
    return (
      <div className="p-4 border rounded-md">
        <h3 className="font-medium mb-2">Google Maps API Key Required</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please enter your Google Maps API key. This will be stored locally on your device.
        </p>
        <form onSubmit={handleApiKeySubmit} className="space-y-2">
          <input
            type="text"
            name="apiKey"
            placeholder="Enter Google Maps API Key"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-pgblue-500 text-white rounded-md hover:bg-pgblue-600"
          >
            Save API Key
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pgblue-600"></div>
        </div>
      )}
    </div>
  );
};

export default PropertyLocationMap;
