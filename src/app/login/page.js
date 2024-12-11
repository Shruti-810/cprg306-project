'use client'

import React, { useState } from "react";
import Link from "next/link";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useRouter } from "next/navigation";
import { userAgent } from "next/server";

export default function Page() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  async function handleLogin(event){
    event.preventDefault();
    if(!isSigningIn){
      console.log("Logging In.")
      setIsSigningIn(true)
      if( email == '' || password == ''){
        setErrorMessage("Please Enter Email and Password")
        setIsSigningIn(false)
        return
      }
      try{
       const res = await doSignInWithEmailAndPassword(email, password);
       setIsSigningIn(false)
       router.push('/status')
      }
      catch(error){
        console.log(error)
        setErrorMessage(error.message)
        setIsSigningIn(false)
      }
    }
  }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-teal-300">
        <div className="w-full max-w-md bg-neutral-100 p-8 rounded-lg shadow-lg">
        <div className="text-2xl font-semibold text-gray-900 mb-6 text-center">Login</div>
        
        {
          errorMessage !== '' ? <small className="text-red-500 mb-4">{errorMessage}</small> : null
        }
        
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter your Email"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Enter your Password"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>
  
          <button className="w-full bg-gray-300 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-400 mb-4" onClick={handleLogin}>
            Login
          </button>
  
          <div className="text-center">
            <small className="text-sm text-gray-600 text-center">Don't have an account? </small>
            <button className="text-sm text-gray-900 font-bold hover:underline">
              <Link href="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
  