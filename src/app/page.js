'use client'

import Link from "next/link";
import Navbar from "./navbar";
import { useAuth } from './contexts/authContexts/index'


export default function Page() {
  const {userLoggedIn} = useAuth();
  return (
<div className="h-full bg-teal-200">
  {/* Navigation Bar */}
<Navbar />

  {/* Main Section */}
  <main className="grid grid-cols-1 md:grid-cols-2 items-center mt-24 px-4">
  {/* Text Section */}
  <div className="text-center md:text-left ml-48">
    <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
      Stay Organized, Stay Focused
    </h3>
    <small className="text-gray-600 text-sm block mb-6">
      Your ultimate tool for managing and tracking your job search journey.
    </small>
    <button className="bg-amber-50 text-gray-900 px-6 py-2 rounded-lg font-medium shadow-md">
    { userLoggedIn ?
    <Link href="/status">Get Started</Link>
    :
    <Link href="/login">Get Started</Link>
    }
    </button>
  </div>

  {/* Image Section */}
  <div className="flex ml-20">
    <img
      src="/job.png"
      width={500}
      height={500}
      alt="No Image"
      className=""
    />
  </div>
</main>


</div>

  );
}
