const Contact = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Contact Info */}
                <div className="space-y-8">
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                        Let's Talk <br />
                        <span className="text-blue-600">Adventure.</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-md">
                        Have questions about your next trip or want to partner with us? We're here to help you get started.
                    </p>

                    <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                ✉️
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Us</div>
                                <div className="text-lg font-semibold text-gray-900">hello@atvisited.com</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                📍
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Visit Us</div>
                                <div className="text-lg font-semibold text-gray-900">123 Horizon Way, Sky City</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-50">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Name</label>
                                <input type="text" className="w-full px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none transition-all placeholder-gray-400 font-medium" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                                <input type="email" className="w-full px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none transition-all placeholder-gray-400 font-medium" placeholder="Your email" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                            <textarea rows="4" className="w-full px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none transition-all placeholder-gray-400 font-medium resize-none" placeholder="Tell us about your next big journey..."></textarea>
                        </div>
                        <button className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all text-lg">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
