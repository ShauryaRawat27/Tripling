"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import WelcomePage from "@/components/welcomePage"; // Before Sign In
import LandingPage from "@/components/landingPage"; // After Sign In

export default function Home() {
  const { data: session } = useSession(); // Get authentication state

  if (!session) {
    return <WelcomePage onSignIn={() => signIn("google")} />;
  }

  return <LandingPage onSignOut={() => signOut()} />;
}
