"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full py-10 px-10 mr-auto font-mulish">
      <hr className="w-full md:hidden border-slate-500 mt-12 mb-5" />
    <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-0 md:items-start justify-between mb-5">
      <div className='w-full basis-1/4 flex flex-col justify-center md:justify-start'>
        <div className='flex flex-col items-center md:items-start w-full'>
          <Link href="/" className="flex items-center">
          <Image
            src='/assets/images/logo.svg'
            width={180}
            height={180}
            alt="ArchQuest Logo"
            className='object-contain'
          />
        </Link>
        </div>
        <div className="w-full flex flex-col ml-2 mt-3 text-center md:text-start text-slate-300">
          <p>&copy; 2025 - All rights reserved.</p>
        </div>
      </div>

      <div className="w-full basis-1/4 flex flex-col items-center justify-center">
        <h4 className="text-xl font-bold mb-4 text-slate-300">Explore</h4>
        <div className='flex flex-col text-center'>
          <Link href="/" className="text-gray-400 mb-2 font-normal hover:underline">Privacy Policy</Link>
          <Link href="#features" className="text-gray-400 mb-2 font-normal hover:underline">Features</Link>
          <Link href="#advantages" className="text-gray-400 mb-2 font-normal hover:underline">Advantages</Link>
        </div>
      </div>
      
      <div className="w-full basis-1/4 justify-center flex flex-col items-center">
        <h4 className="text-xl font-bold mb-4 text-slate-300">Contact Us</h4>
        <Link 
          href=""
          className=" text-sm font-normal mb-2 text-gray-400 cursor-pointer" 
          onClick={() => window.open('mailto:aug.spc@outlook.com?subject=Contact%20ArchQuest')}
          >Email</ Link>
      </div>
      

      {/*<div className="footer-section">
        <h4 className="text-2xl font-bold mb-4 text-gray-600">Connect</h4>
        <p className=" text-sm font-normal mb-2 text-gray-400">Follow us on social media:</p>
      </div> */}
    </div>

  </footer>
  )
}
