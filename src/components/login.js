"use client"; 

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button onClick={() => signIn("google")} className="p-2 bg-blue-500 text-white rounded">
      Sign in with Google
    </button>
  );
}
