import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fix for default marker icon in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ places, height = '500px', center = [7.4567, 81.8234], zoom = 12 }) => {
    // If there are places, center the map on the first one
    const mapCenter = places && places.length > 0 && places[0].latitude && places[0].longitude
        ? [places[0].latitude, places[0].longitude]
        : center;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 z-10 bg-white p-2"
            style={{ height }}
        >
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden">
                <MapContainer
                    center={mapCenter}
                    zoom={zoom}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    {places && places.map((place) => (
                        place.latitude && place.longitude && (
                            <Marker key={place.id} position={[place.latitude, place.longitude]}>
                                <Popup className="custom-popup">
                                    <div className="p-2 min-w-[200px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                                <MapPin size={16} />
                                            </div>
                                            <h4 className="font-bold text-slate-900 text-sm m-0">{place.name}</h4>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-medium mb-3 leading-tight line-clamp-2">
                                            {place.address || place.description}
                                        </p>
                                        <Link
                                            to={`/place/${place.id}`}
                                            className="flex items-center justify-center gap-1.5 w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold hover:bg-blue-600 transition-colors"
                                        >
                                            <Navigation size={12} />
                                            EXPLORE NOW
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    ))}
                </MapContainer>
            </div>

            {/* Map Overlay Controls Hint */}
            <div className="absolute bottom-6 right-6 z-[1000] pointer-events-none">
                <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-slate-100 shadow-sm text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Interactive Map
                </div>
            </div>
        </motion.div>
    );
};

export default MapView;
