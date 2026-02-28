import { MapPin, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api, { getFullImageUrl } from '../../services/api';

const PlaceCard = ({ place }) => {

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 h-full flex flex-col"
        >
            <Link to={`/place/${place.id}`} className="block relative aspect-[4/3] overflow-hidden">
                <img
                    src={getFullImageUrl(place.imageUrl)}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full shadow-sm text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        <Tag size={12} />
                        {place.categoryName || 'Adventure'}
                    </div>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <Link to={`/place/${place.id}`} className="block">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-emerald-600 transition-colors">
                        {place.name}
                    </h3>
                </Link>
                <div className="flex items-center gap-1.5 text-slate-500 mb-5">
                    <MapPin size={16} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-xs font-medium truncate">{place.description || 'Explore Destination'}</span>
                </div>

                <div className="mt-auto">
                    <Link
                        to={`/place/${place.id}`}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-50 text-slate-900 rounded-2xl font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all group/btn"
                    >
                        Details
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PlaceCard;
