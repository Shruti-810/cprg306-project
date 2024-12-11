'use client'

import Link from "next/link"
import { useAuth } from "./contexts/authContexts"
import { doSignOut } from "./firebase/auth"
import { useRouter } from "next/navigation"

export default function Navbar(){
    const { userLoggedIn, currentUser } = useAuth()

    const router = useRouter();
    // console.log(currentUser)

    let handleLogout = (event) => {
        event.preventDefault();
        doSignOut();
        router.push('/');
    }
    return(
        <div>
        <div className="grid grid-cols-2 items-center bg-white shadow-xl p-4">
        <div className="text-left ml-48 font-semibold text-2xl text-gray-900 font-sans">
        <Link href="/">Jobflow</Link>
        </div>
        <div className="text-right mr-48">
        {
                !userLoggedIn ?
                    <button className="font-semibold text-sm text-gray-900 pt-1">
                        <Link href="/login">Login</Link>
                    </button>
                :   
                    <button className="font-semibold text-sm text-gray-900 pt-1" onClick={handleLogout}>
                        Logout
                    </button>
        }
        </div>
      </div>
    </div>
    )
}