const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 text-center italic">
                Our Story
            </h1>

            <div className="space-y-12 text-lg text-gray-600 leading-relaxed text-center">
                <p>
                    AtVisited was born out of a simple idea: travel should be more than just visiting places—it should be about capturing the soul of every destination.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-8">
                    <div className="p-8 bg-blue-50 rounded-3xl border-2 border-blue-100/50">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4 tracking-tight">Our Mission</h3>
                        <p className="text-blue-800/80">
                            To empower explorers with the tools they need to document their journeys and discover the world's most authentic experiences.
                        </p>
                    </div>

                    <div className="p-8 bg-indigo-50 rounded-3xl border-2 border-indigo-100/50">
                        <h3 className="text-2xl font-bold text-indigo-900 mb-4 tracking-tight">Our Vision</h3>
                        <p className="text-indigo-800/80">
                            A world where every traveler is a storyteller, and every journey is a bridge between cultures.
                        </p>
                    </div>
                </div>

                <div className="pt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 italic">Meet the Team</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group text-center">
                                <div className="w-24 h-24 bg-gray-200 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white shadow-xl shadow-gray-200 overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-80" />
                                </div>
                                <div className="font-bold text-gray-900">Adventurer {i}</div>
                                <div className="text-sm text-gray-400">Explorer</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
