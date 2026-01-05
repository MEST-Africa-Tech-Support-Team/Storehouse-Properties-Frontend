export default function HeroSection() {
  return (
    <div className="relative w-full h-[400px] sm:h-[400px] md:h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-900/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Find Your Perfect
          <br /> Stay, Effortlessly.
        </h1>
        <p className="text-base sm:text-lg md:text-lg mb-6 max-w-2xl">
          Discover verified rental properties and book with confidence.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full text-sm mb-8 transition">
          Search Properties
        </button>
      </div>
    </div>
  );
}