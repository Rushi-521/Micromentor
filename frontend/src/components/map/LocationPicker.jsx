import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function LocationPicker({ onLocationSelect, initialPosition }) {
  const [position, setPosition] = useState(initialPosition || { lat: 18.5204, lng: 73.8567 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (position) {
      onLocationSelect(position);
    }
  }, [position, onLocationSelect]);

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(newPos);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Please enable location access in your browser settings');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Select Your Location
        </label>
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={loading}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 disabled:text-gray-400"
        >
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{loading ? 'Getting location...' : 'Use my location'}</span>
        </button>
      </div>

      <div className="h-64 rounded-lg overflow-hidden border-2 border-gray-300">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>

      <p className="text-sm text-gray-500">
        📍 Click on the map to set your location or use the button above
      </p>
      <p className="text-xs text-gray-400">
        Current: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
      </p>
    </div>
  );
}