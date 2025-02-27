import React from 'react';

const destinations = [
  { id: 1, name: 'California', places: '05 Places', rating: 4.7, image: '/images/california.jpg' },
  { id: 2, name: 'All Inclusive', places: '16 Places', rating: 4.7, image: '/images/all-inclusive.jpg' },
  { id: 3, name: 'Thailand', places: '10 Places', rating: 4.7, image: '/images/thailand.jpg' },
  { id: 4, name: 'Tokyo', places: '08 Places', rating: 4.7, image: '/images/tokyo.jpg' }
];  

const LandingPage2 = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen overflow-y-auto">
      <div className="container mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <img src="/images/hot-air-balloon.jpg" alt="Hot Air Balloon" className="w-12 h-12" />
            <span className="text-orange-500 text-xl font-semibold">Popular Destination</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900 tracking-wide">
          <strong>Featured Destination</strong>
        </h1>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative rounded-t-xl overflow-hidden">
                <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-extrabold text-xl mb-2 text-center text-black">{destination.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-black stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-base font-bold text-gray-600">{destination.places}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-base font-bold text-blue-500">{destination.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Content for Scrolling */}
        <div className="mt-20 text-center">
          <p className="text-gray-700">Scroll down for more...</p>
        </div>

      </div>
    </div>
  );
};

export default LandingPage2;
