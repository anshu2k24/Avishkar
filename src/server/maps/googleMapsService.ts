
export interface MapLocation {
  lat: number;
  lng: number;
}

class GoogleMapsService {
  private apiKey: string | null = null;
  
  constructor() {
    this.apiKey = localStorage.getItem('googleMapsApiKey');
  }
  
  /**
   * Initialize Google Maps with API key
   */
  initialize(apiKey: string): boolean {
    this.apiKey = apiKey;
    localStorage.setItem('googleMapsApiKey', apiKey);
    return true;
  }
  
  /**
   * Get the Google Maps API key
   */
  getApiKey(): string | null {
    return this.apiKey;
  }
  
  /**
   * Check if Google Maps is initialized
   */
  isInitialized(): boolean {
    return !!this.apiKey;
  }
  
  /**
   * Get the Google Maps script URL
   */
  getScriptUrl(): string {
    if (!this.apiKey) {
      throw new Error("Google Maps API key not set");
    }
    return `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
  }
}

// Create singleton instance
const googleMapsService = new GoogleMapsService();

export default googleMapsService;
