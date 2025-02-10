import Login from "../components/login";
import Logout from "../components/logout";
import Profile from "../components/profile";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Google OAuth with NextAuth.js</h2>
      <Login />
      <Logout />
      <Profile />
    </div>
  );
}
