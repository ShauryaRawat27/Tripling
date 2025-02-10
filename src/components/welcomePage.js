export default function WelcomePage({ onSignIn }) {
    return (
      <div className="flex flex-col items-center gap-4 min-h-screen justify-center bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Welcome! Please Sign In</h2>
        <p className="text-lg text-gray-600">Join us and explore our amazing platform.</p>
        <button
          onClick={onSignIn}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    );
  }
  