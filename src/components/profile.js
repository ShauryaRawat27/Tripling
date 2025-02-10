"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <img src={session.user.image} alt="Profile" className="w-12 h-12 rounded-full" />
    </div>
  );
}
