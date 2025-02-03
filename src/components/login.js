import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import  axios  from 'axios';

function Login({ setUser }) {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
        setUser(userInfo.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => console.log('Login Failed!'),
  });

  return (
    <button
      onClick={login}
      className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
    >
      <FcGoogle className="mr-2" size={20} />
      <span className="font-medium">Sign in with Google</span>
    </button>
  );
}

export default Login;
