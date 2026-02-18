import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <nav className="bg-white/80 border-b border-gray-100 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-200">
                                A
                            </div>
                            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                                AtVisited
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-10">
                            <Link to="/" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Home</Link>
                            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">About</Link>
                            <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Contact</Link>
                            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-black transition-all shadow-md shadow-gray-200">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Button placeholder */}
                        <div className="md:hidden flex items-center">
                            <button className="p-2 text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                                A
                            </div>
                            <span className="text-xl font-bold text-gray-900">AtVisited</span>
                        </div>
                        <div className="flex space-x-8 text-gray-500 font-medium">
                            <Link to="/" className="hover:text-blue-600 transition-colors">Privacy</Link>
                            <Link to="/" className="hover:text-blue-600 transition-colors">Terms</Link>
                            <Link to="/" className="hover:text-blue-600 transition-colors">Help</Link>
                        </div>
                        <p className="text-gray-400 text-sm italic">© 2026 AtVisited. Crafted with ❤️ for explorers.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
