import React from 'react';
import { Heart, ShoppingCart, Search as SearchIcon } from 'lucide-react';
import Image from 'next/image';



export default function Navbar ({ onSignOut }) {
  return (
    <div className="relative z-20">
       <nav className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div>
            <Image 
            src="/logoforsr.png"
            alt="logo"
            width={100}
            height={100}
            />

          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <a href="#" className="text-white hover:text-sky-400">Home</a>
          <a href="#" className="text-white hover:text-sky-400">About Us</a>
          <a href="#" className="text-white hover:text-sky-400">Destinations</a>

        </div>

        <div className="flex items-center space-x-8">
          <button className="text-white hover:text-sky-400">
            <Heart size={20} />
          </button>
          <button className="text-white hover:text-sky-400">
            <ShoppingCart size={20} />
          </button>
          <button className="text-white hover:text-sky-400">
            <SearchIcon size={20} />
          </button>
          <button  onClick={onSignOut} className="bg-sky-400 text-white px-3 py-1 rounded-lg hover:bg-sky-500">
            Sign Out
          </button>
        </div>
      </nav>

    </div>
  )
}
