import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapLegend } from './MapLegend';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different issue priorities
const createCustomIcon = (priority: string) => {
  const colors = {
    Critical: '#ef4444',
    High: '#f97316',
    Medium: '#eab308',
    Low: '#22c55e'
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${colors[priority as keyof typeof colors] || '#6b7280'};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
};

// Dummy issue locations

const dummyIssues = [
  {
    id: 'ISS-001',
    title: 'Pothole near Albert Ekka Chowk',
    category: 'Road Maintenance',
    priority: 'High',
    status: 'In Progress',
    coordinates: [23.3701, 85.3250], // Ranchi
    address: 'Albert Ekka Chowk, Ranchi, Jharkhand',
    department: 'Public Works'
  },
  {
    id: 'ISS-002',
    title: 'Broken Street Light at Bistupur',
    category: 'Street Light',
    priority: 'Medium',
    status: 'Open',
    coordinates: [22.8000, 86.1830], // Jamshedpur
    address: 'Bistupur Main Road, Jamshedpur, Jharkhand',
    department: 'Electrical'
  },
  {
    id: 'ISS-003',
    title: 'Overflowing Trash Bin at Bank More',
    category: 'Waste Management',
    priority: 'Low',
    status: 'Resolved',
    coordinates: [23.7957, 86.4304], // Dhanbad
    address: 'Bank More Market, Dhanbad, Jharkhand',
    department: 'Sanitation'
  },
  {
    id: 'ISS-004',
    title: 'Water Pipeline Leakage in Sector 4',
    category: 'Water Supply',
    priority: 'Critical',
    status: 'In Progress',
    coordinates: [23.6693, 86.1511], // Bokaro
    address: 'Sector 4, Bokaro Steel City, Jharkhand',
    department: 'Water Department'
  },
  {
    id: 'ISS-005',
    title: 'Damaged Bench in Canary Hill Park',
    category: 'Parks & Recreation',
    priority: 'Low',
    status: 'Open',
    coordinates: [23.9925, 85.3616], // Hazaribagh
    address: 'Canary Hill Park, Hazaribagh, Jharkhand',
    department: 'Parks & Recreation'
  },
  {
    id: 'ISS-006',
    title: 'Blocked Drain at Baidyanath Dham',
    category: 'Drainage',
    priority: 'High',
    status: 'Open',
    coordinates: [24.4828, 86.6947], // Deoghar
    address: 'Near Baidyanath Dham Temple, Deoghar, Jharkhand',
    department: 'Public Works'
  }
];


const statusColors = {
  'Open': '#ef4444',
  'In Progress': '#f59e0b',
  'Resolved': '#10b981',
  'Closed': '#6b7280'
};

interface MapComponentProps {
  className?: string;
}

export function MapComponent({ className = '' }: MapComponentProps) {
  useEffect(() => {
    // Add custom CSS for markers
    const style = document.createElement('style');
    style.textContent = `
      .custom-marker {
        background: transparent !important;
        border: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  function FitBounds({ issues }: { issues: typeof dummyIssues }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(issues.map((i) => i.coordinates as [number, number]));
    map.fitBounds(bounds, { padding: [50, 50] }); // auto zoom + center
  }, [issues, map]);
  return null;
}


  return (
    <div className={`w-full h-full relative ${className}`}>
   <MapContainer
        center={[23.3441, 85.3096]} // fallback Ranchi
        zoom={7} // wide zoom initially
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {dummyIssues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.coordinates[0], issue.coordinates[1]]}
            icon={createCustomIcon(issue.priority)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {issue.title}
                  </h3>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: statusColors[issue.status as keyof typeof statusColors] }}
                  >
                    {issue.status}
                  </span>
                </div>
                
                <div className="space-y-1 text-xs text-gray-600">
                  <p><strong>ID:</strong> {issue.id}</p>
                  <p><strong>Category:</strong> {issue.category}</p>
                  <p><strong>Priority:</strong> 
                    <span className={`ml-1 font-medium ${
                      issue.priority === 'Critical' ? 'text-red-600' :
                      issue.priority === 'High' ? 'text-orange-600' :
                      issue.priority === 'Medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {issue.priority}
                    </span>
                  </p>
                  <p><strong>Department:</strong> {issue.department}</p>
                  <p><strong>Address:</strong> {issue.address}</p>
                </div>
                
                <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1 px-2 rounded transition-colors">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
          <FitBounds issues={dummyIssues} />
      </MapContainer>
      
      <MapLegend />
    </div>
  );
}