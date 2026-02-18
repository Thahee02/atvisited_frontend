const Home = () => {
    return (
        <div className="space-y-20 pb-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-12 md:py-20 text-center">
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
                        Explore the World with
                        <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            AtVisited
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Your premium travel companion. Discover breathtaking destinations,
                        track your journeys, and share experiences with a community of explorers.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95">
                            Start Your Journey
                        </button>
                        <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-md border border-blue-100 hover:bg-blue-50 transition-all hover:scale-105 active:scale-95">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Discover",
                            desc: "Find hidden gems and popular landmarks across the globe with our curated guides.",
                            icon: "🌍"
                        },
                        {
                            title: "Plan",
                            desc: "Seamlessly organize your itineraries with our intuitive drag-and-drop builder.",
                            icon: "📅"
                        },
                        {
                            title: "Share",
                            desc: "Connect with fellow travelers and showcase your memories in high definition.",
                            icon: "📸"
                        }
                    ].map((feature, i) => (
                        <div key={i} className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gradient-to-br from-gray-900 to-indigo-950 text-white rounded-[3rem] p-12 md:p-20 mx-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Active Users", value: "50k+" },
                        { label: "Countries", value: "120+" },
                        { label: "Trips Planned", value: "200k+" },
                        { label: "Reviews", value: "4.9/5" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-3xl md:text-5xl font-black mb-2 text-blue-400">{stat.value}</div>
                            <div className="text-gray-400 font-medium uppercase tracking-wider text-xs md:text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
