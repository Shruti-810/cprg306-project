'use client'

import React, { useState } from "react";
import Link from "next/link";
import { doCreateUserWithEmailAndPassword, doUpdateProfile } from "../firebase/auth";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')


    async function handleSignUp(event) {
      event.preventDefault();
      if(!isRegistering){
          console.log("Signing In.")
            setIsRegistering(true);
            if(password !== confirmPassword){
              setErrorMessage('Please Enter Confirm Password Again.')
              setIsRegistering(false)
              return
            } 
            else{
              setErrorMessage('')
            }
            try{
                const res = await doCreateUserWithEmailAndPassword(email, password);
                console.log("User has successfully created account.")
                console.log(res.user)
                // const res1= await doUpdateProfile(res.auth, {displayName: name})
                // console.log(res1)
                setIsRegistering(false)
                router.push('/status')
            }
            catch(error){
                console.log(error.message)
                setErrorMessage(error.message)
                setIsRegistering(false)
            }
        }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-teal-300">
        <div className="w-full max-w-md bg-neutral-100 p-8 rounded-lg shadow-lg">
        <div className="text-2xl font-semibold text-gray-900 mb-6 text-center">Sign Up</div>

        {
          errorMessage !== '' ? <small className="text-red-500 mb-4">{errorMessage}</small> : null
        }
        
        <div className="mb-6">
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
             value={name}
             onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Enter your Name"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
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
            <label className="block text-sm font-medium text-gray-700">
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

          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
             value={confirmPassword}
             onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              placeholder="Enter your Password"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>
  
          <button className="w-full bg-gray-300 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-400 mb-4" onClick={handleSignUp}>
            Sign Up
          </button>
  
          <div className="text-center">
            <small className="text-sm text-gray-600 text-center">Don't have an account? </small>
            <button className="text-sm text-gray-900 font-bold hover:underline">
              <Link href="/login">Sign In</Link>
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  }
  