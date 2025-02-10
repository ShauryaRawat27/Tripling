export default function LandingPage({ onSignOut }) {
    return (
      <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900">Welcome to Our Platform</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl">
          We offer the best services to meet your needs. Join us today and explore!
        </p>
  
        <button
          onClick={onSignOut}
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }
  