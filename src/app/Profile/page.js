'use client';

import React, { useState } from 'react';
import {
  User,
  Settings,
  LogOut,
  Mail,
  Calendar,
  Camera,
  Edit,
  Check,
  ChevronLeft,
} from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WelcomePage from '@/components/welcomePage';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('interests');
  const [interests, setInterests] = useState(['Photography', 'Travel', 'Design']);
  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return <WelcomePage onSignIn={() => signIn('google')} />;
  }

  const name = session.user.name;
  const email = session.user.email;
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
  const joinDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const onSignOut = () => {
    signOut();
  };

  const goToLanding = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-6 md:p-8 ">
         <Image
                      src="/profile.png"
                      alt="Background Image"
                      layout="fill"
                      objectFit="cover"
                      className="z-[-40] bg-black opacity-40"
                    />
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-[10%]">
        {/* Left Sidebar */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex justify-center">
            <div className="relative">
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6 text-center">
            <h1 className="text-xl font-bold text-gray-800">{name}</h1>
            <div className="flex items-center justify-center mt-2 text-gray-500">
              <Mail className="w-4 h-4 mr-2" />
              <p className="text-sm">{email}</p>
            </div>
            <div className="flex items-center justify-center mt-2 text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <p className="text-sm">Joined {joinDate}</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 mr-2" />
                <span>Edit</span>
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Overview</h2>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-500 font-semibold">Activity Status</p>
              <p className="text-2xl font-bold mt-1">Active</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-500 font-semibold">Account Type</p>
              <p className="text-2xl font-bold mt-1">Premium</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <div className="flex space-x-8">
              {['interests', 'badges', 'goals'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'interests' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">My Interests</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {isEditing ? <Check className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>

                {isEditing && (
                  <div className="mb-4 flex">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add new interest"
                      className="flex-grow border border-gray-300 rounded-l-md py-2 px-3 text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                    />
                    <button
                      onClick={handleAddInterest}
                      className="bg-blue-500 text-white py-2 px-4 rounded-r-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {interest}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveInterest(index)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">My Achievements</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Early Adopter', 'Content Creator', 'Super User'].map((badge, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        {index + 1}
                      </div>
                      <p className="font-medium text-gray-700">{badge}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">My Goals</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Complete profile', progress: 80 },
                    { name: 'Get first badge', progress: 100 },
                    { name: 'Invite friends', progress: 40 },
                  ].map((goal, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{goal.name}</span>
                        <span className="text-gray-500">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={goToLanding}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </button>

            <button
              onClick={onSignOut}
              className="flex items-center text-gray-600 hover:text-red-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
