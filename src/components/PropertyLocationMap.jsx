import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const createCustomIcon = () => {
  return L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Component to update map view when coordinates change
function ChangeMapView({ coordinates }) {
  const map = useMap();
  
  useEffect(() => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      map.flyTo([coordinates.lat, coordinates.lng], 14, {
        animate: true,
        duration: 1.5
      });
    }
  }, [coordinates, map]);
  
  return null;
}

const PropertyLocationMap = ({ property }) => {
  const [coordinates, setCoordinates] = useState({ lat: 25.2048, lng: 55.2708 }); // Default to Dubai
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationText, setLocationText] = useState("");

  useEffect(() => {
    const fetchCoordinates = async () => {
      setIsLoading(true);
      setError(null);

      // Get full address from property
      const address = [
        property?.propertyaddress,
        property?.subcommunity,
        property?.community,
        property?.country || "UAE"
      ]
        .filter(Boolean)
        .join(", ");

      setLocationText(address);

      if (!address || address === ", , UAE") {
        setError("No valid address provided");
        setIsLoading(false);
        return;
      }

      try {
        // Use Nominatim for geocoding (OpenStreetMap's geocoding service)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
          {
            headers: {
              "User-Agent": "TheMansionMarket/1.0"
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Geocoding failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({ 
            lat: parseFloat(lat), 
            lng: parseFloat(lon) 
          });
        } else {
          // Fallback to just community if detailed address failed
          if (property?.community) {
            const fallbackResponse = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(property.community + ", UAE")}&limit=1`,
              {
                headers: {
                  "User-Agent": "TheMansionMarket/1.0"
                }
              }
            );
            
            const fallbackData = await fallbackResponse.json();
            
            if (fallbackData && fallbackData.length > 0) {
              const { lat, lon } = fallbackData[0];
              setCoordinates({ 
                lat: parseFloat(lat), 
                lng: parseFloat(lon) 
              });
            } else {
              setError("Location not found");
            }
          } else {
            setError("Location not found");
          }
        }
      } catch (err) {
        console.error("Geocoding error:", err);
        setError("Failed to load map location");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [property]);

  // Create custom icon
  const customIcon = createCustomIcon();

  return (
    <div className="w-full mt-8">
      <h2 className="text-3xl mb-6 font-playfair text-[#00603A]">
        Location Map
      </h2>
      <div className="w-full relative h-96 border border-gray-200">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50">
            <p className="text-red-600 font-medium">{error}</p>
            <p className="mt-2 text-gray-500 text-sm">Please check the property address details</p>
          </div>
        ) : (
          <MapContainer
            center={[coordinates.lat, coordinates.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker 
              position={[coordinates.lat, coordinates.lng]} 
              icon={customIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{property?.title || "Property Location"}</p>
                  <p className="mt-1">{locationText}</p>
                </div>
              </Popup>
            </Marker>
            <ChangeMapView coordinates={coordinates} />
          </MapContainer>
        )}
      </div>
      {/* <div className="mt-2 flex items-start">
        <Marker className="text-[#00603A] w-4 h-4 mt-1 mr-1" />
        <p className="text-sm text-gray-600">{locationText || "Address information unavailable"}</p>
      </div> */}
    </div>
  );
};

export default PropertyLocationMap;