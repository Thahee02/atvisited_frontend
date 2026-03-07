import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Function to refocus map
// Improved ChangeView to handle bounds
function ChangeView({ places, center, zoom }) {
    const map = useMap();

    useEffect(() => {
        if (places && places.length > 0) {
            const validPlaces = places.filter(p => p.latitude && p.longitude);
            if (validPlaces.length > 0) {
                const bounds = L.latLngBounds(validPlaces.map(p => [p.latitude, p.longitude]));
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
            }
        } else if (center) {
            map.setView(center, zoom);
        }
    }, [places, center, zoom, map]);

    return null;
}


let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ places, height = '500px', center, zoom = 13, showRoute = true }) => {
    // State for actual road geometry
    const [routeGeometry, setRouteGeometry] = useState([]);
    const [routeLoading, setRouteLoading] = useState(false);

    // Default center if nothing else is available
    const defaultCenter = [7.8731, 80.7718]; // Sri Lanka center
    const mapCenter = center || (places && places.length > 0 && places[0].latitude ? [places[0].latitude, places[0].longitude] : defaultCenter);

    // Fetch road route from OSRM
    useEffect(() => {
        const fetchRoute = async () => {
            if (!showRoute || !places || places.length < 2) {
                setRouteGeometry([]);
                return;
            }

            const validPlaces = places.filter(p => p.latitude && p.longitude);
            if (validPlaces.length < 2) return;

            setRouteLoading(true);
            try {
                // Construct OSRM API URL: lon,lat;lon,lat;...
                const coordinates = validPlaces
                    .map(p => `${p.longitude},${p.latitude}`)
                    .join(';');

                const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
                );
                const data = await response.json();

                if (data.code === 'Ok' && data.routes?.[0]?.geometry?.coordinates) {
                    // GeoJSON format is [lon, lat], Leaflet needs [lat, lon]
                    const routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                    setRouteGeometry(routeCoords);
                } else {
                    console.error('OSRM Route failed:', data.code);
                    // Fallback to straight lines
                    setRouteGeometry(validPlaces.map(p => [p.latitude, p.longitude]));
                }
            } catch (error) {
                console.error('Error fetching road route:', error);
                // Fallback to straight lines
                setRouteGeometry(validPlaces.map(p => [p.latitude, p.longitude]));
            } finally {
                setRouteLoading(false);
            }
        };

        fetchRoute();
    }, [places, showRoute]);

    // Custom numbered icon for markers
    const createNumberedIcon = (number) => {
        return L.divIcon({
            className: 'custom-div-icon',
            html: `
                <div class="relative flex items-center justify-center">
                    <div class="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-2xl border-2 border-white transform transition-transform hover:scale-110 active:scale-95">
                        ${number}
                    </div>
                    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-b-2 border-r-2 border-white"></div>
                </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 z-10 bg-white p-2"
            style={{ height }}
        >
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative">
                <MapContainer
                    center={mapCenter}
                    zoom={zoom}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <ChangeView places={places} center={mapCenter} zoom={zoom} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    {showRoute && routeGeometry.length > 0 && (
                        <>
                            {/* Path Glow/Shadow */}
                            <Polyline
                                positions={routeGeometry}
                                color="#10b981"
                                weight={10}
                                opacity={0.15}
                                lineCap="round"
                                lineJoin="round"
                            />
                            {/* Main Path Line */}
                            <Polyline
                                positions={routeGeometry}
                                color="#10b981"
                                weight={5}
                                opacity={0.9}
                                lineCap="round"
                                lineJoin="round"
                            />
                        </>
                    )}
                    {places && places.map((place, index) => (
                        place.latitude && place.longitude && (
                            <Marker
                                key={place.id || index}
                                position={[place.latitude, place.longitude]}
                                icon={place.visitOrder ? createNumberedIcon(place.visitOrder) : DefaultIcon}
                            >
                                <Popup className="custom-popup">
                                    <div className="p-3 min-w-[220px]">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
                                                {place.visitOrder ? (
                                                    <span className="font-black text-xs">{place.visitOrder}</span>
                                                ) : (
                                                    <MapPin size={18} />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 text-sm m-0 leading-tight">{place.name}</h4>
                                                {place.visitOrder && (
                                                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Destination #{place.visitOrder}</span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-slate-500 font-medium mb-4 leading-relaxed line-clamp-2">
                                            {place.address || place.description}
                                        </p>
                                        <Link
                                            to={`/place/${place.id}`}
                                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-[0.98]"
                                        >
                                            <Navigation size={12} />
                                            Explore Location
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    ))}
                </MapContainer>
            </div>

            {/* Map Overlay Controls Hint */}
            <div className="absolute top-6 right-6 z-[1000] pointer-events-none flex flex-col items-end gap-2">
                <div className="bg-white/90 backdrop-blur px-5 py-2.5 rounded-2xl border border-slate-100 shadow-xl text-[10px] font-black tracking-[0.2em] text-slate-800 uppercase flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Interactive Voyage
                </div>
                {routeLoading && (
                    <div className="bg-slate-900/90 backdrop-blur px-4 py-1.5 rounded-xl text-[8px] font-black tracking-widest text-emerald-400 uppercase">
                        Calculating Roads...
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MapView;
