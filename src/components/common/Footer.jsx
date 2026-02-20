import { Link } from 'react-router-dom';
import { MapPin, Instagram, Twitter, Facebook, Mail, Phone, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 transition-transform hover:scale-105 inline-flex">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                                <MapPin size={18} />
                            </div>
                            <span className="text-xl font-black tracking-tight text-white">
                                AtVisited
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Redefining the way you explore the world. Join our community of travelers and discover the extraordinary.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/explore" className="hover:text-blue-400 transition-colors">Destinations</Link></li>
                            <li><Link to="/categories" className="hover:text-blue-400 transition-colors">Categories</Link></li>
                            <li><Link to="/featured" className="hover:text-blue-400 transition-colors">Featured</Link></li>
                            <li><Link to="/nearby" className="hover:text-blue-400 transition-colors">Nearby Places</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-400 transition-colors">Help & FAQ</Link></li>
                            <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3"><Mail size={16} className="text-blue-500" /> hello@atvisited.com</li>
                            <li className="flex items-center gap-3"><Phone size={16} className="text-blue-500" /> +1 (555) 123-4567</li>
                            <li className="flex items-center gap-3"><Globe size={16} className="text-blue-500" /> global.atvisited.com</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© 2026 AtVisited. All rights reserved.</p>
                    <p className="flex items-center gap-1 italic text-slate-500">
                        Designed with ❤️ by AtVisited Team
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
