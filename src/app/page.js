"use client";
import Navbar from "@/components/navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import WelcomePage from "@/components/welcomePage"; // Before Sign In
import LandingPage from "@/components/landingPage"; // After Sign In
import Landtwo from "@/components/landtwo";

export default function Home() {
  const { data: session } = useSession(); // Get authentication state

  if (!session) {
    return <WelcomePage onSignIn={() => signIn("google")} />;
  }

  return <>
  <div > 
    <Navbar onSignOut={() => signOut()} />
  <LandingPage />;
  {/* <Landtwo /> */}
  
  </div>
  </>
  

 
}
