"use client";
import Navbar from "@/components/navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import WelcomePage from "@/components/welcomePage"; // Before Sign In
import LandingPage from "@/components/landingPage"; // After Sign In
import Maps from "@/components/maps";
import Landtwo from "@/components/landtwo";
import Hello from "@/components/hello";

export default function Home() {
  const { data: session } = useSession(); // Get authentication state

  if (!session) {
    return <WelcomePage onSignIn={() => signIn("google")} />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col scroll-smooth">
      
     
      <div className="relative h-screen w-full">
      <Navbar onSignOut={() => signOut()} />
        <LandingPage />
      </div>


      <div className="relative w-full bg-white">
        <Landtwo />
      </div>
    </div>
    
  );
}