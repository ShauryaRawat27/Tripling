import React from 'react';
import { googleLogout } from '@react-oauth/google';

function Logout({ setUser }) {
  const handleLogout = () => {
    googleLogout();
    setUser(null);
    console.log('Logout Successful!');
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}

export default Logout;
