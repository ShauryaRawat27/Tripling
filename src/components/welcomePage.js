export default function WelcomePage({onSignIn}) {
  return (
    <div className="h-screen bg-white flex">
      {/* Left Column */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 relative">
              Your
              <div className="relative inline-block">
                <span className="relative z-10 ml-2">Portal</span>
                <div className="absolute bottom-1 left-2 w-full h-3 bg-blue-500/30 -z-10"></div>
              </div>
              <br />
              to Global Travel
              <br />
              Inspiration
            </h1>
            <p className="text-gray-600 mb-6">
              Discover authentic travel stories and experiences from fellow explorers.
              Plan your next trip with expert insights.
            </p>
            <button 
              onClick={onSignIn}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">Join 250,000 travelers using Trippling</span>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 p-8">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Two Large Vertical Images */}
          {[
            { name: 'Rome', height: 'h-[450px]' },
            { name: 'Monaco', height: 'h-[450px]' }
          ].map((location, index) => (
            <div key={index} className={`relative rounded-xl overflow-hidden ${location.height}`}>
              <img
                src={`/${location.name.toLowerCase()}.jpg`}
                alt={location.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center text-white">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span className="font-medium">{location.name}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Two Smaller Images Below */}
          {[
            { name: 'Brussels', height: 'h-[250px]' },
            { name: 'Scotland', height: 'h-[250px]' }
          ].map((location, index) => (
            <div key={index} className={`relative rounded-xl overflow-hidden ${location.height}`}>
              <img
                src={`/${location.name.toLowerCase()}.jpg`}
                alt={location.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center text-white">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span className="font-medium">{location.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}