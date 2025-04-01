import React from 'react';
import Image from 'next/image';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link'; 
import { GiPlagueDoctorProfile } from "react-icons/gi";



export default function Navbar ({ onSignOut }) {
  return (
    <div className="relative z-20">
       <nav className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-2">
          <div>
            <Image 
            src="/logoforsr.png"
            alt="logo"
            width={50}
            height={50}
            />

          </div>
        </div>
        
        <div className="flex items-center space-x-8">

        <Link href='/BudgetCalculator' className="text-white hover:text-sky-400 hover:cursor-pointer">
            Budget Calculator
          </Link>
          <Link href='/weather' className="text-white hover:text-sky-400 hover:cursor-pointer">
           Weather
          </Link>
        <ScrollLink 
            className="text-white hover:text-sky-400 hover:cursor-pointer" 
            to="destnation" 
            smooth={true} 
            duration={1000} 
            offset={0}
          >
            Destinations
          </ScrollLink>
        
          <ScrollLink 
            className="text-white hover:text-sky-400 hover:cursor-pointer" 
            to="about" 
            smooth={true} 
            duration={1000} 
            offset={0}
          >
            About us
          </ScrollLink>
          
        </div>

        <div className="flex items-center space-x-8">

          <button className="text-white hover:text-sky-400 hover:cursor-pointer mr-4">
            <Link href='/Profile'>
            <GiPlagueDoctorProfile size="25px" />
            </Link>
          </button>
         
          {/* <button  onClick={onSignOut} className="bg-sky-400 mr-2 text-white px-3 py-1 rounded-lg hover:bg-sky-500">
            Sign Out
          </button> */}
        </div>
      </nav>

    </div>
  )
}
