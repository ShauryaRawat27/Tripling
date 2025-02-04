import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/login';
import Logout from './components/logout';

const clientId = '421605153469-02jl17tkp6169voaht4lfdo185p6fij8.apps.googleusercontent.com';

function App() {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{backgroundImage: "url('/image.png')"}}>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          {!user ? (
            <>
              <h2 className="text-black text-2xl font-bold text-center mb-4">Welcome</h2>
              <p className="text-gray-500 text-center mb-6">Sign in with Google</p>
              <Login setUser={setUser} />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center">Hello, {user.name} 👋</h2>
              <img src={user.picture} alt="Profile" className="w-16 h-16 mx-auto rounded-full my-4" />
              <p className="text-gray-500 text-center">{user.email}</p>
              <Logout setUser={setUser} />
            </>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
