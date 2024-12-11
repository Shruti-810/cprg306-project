'use client'
import Status from "./status"
import Navbar from "../navbar"
import { useState } from "react";
import { useAuth } from "../contexts/authContexts";

export default function Page(){

  const [refreshKey, setRefreshKey] = useState(0); 
  const {userLoggedIn} = useAuth();


  const triggerRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };


    return(
      <div>
       {
        userLoggedIn?
        <div>
        <Navbar />
           <div className="container mx-auto py-8 px-4">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <Status key={`applied-${refreshKey}`} title="Applied" onStatusChange={triggerRefresh}/>
           <Status key={`interviewed-${refreshKey}`} title="Interviewed" onStatusChange={triggerRefresh}/>
           <Status key={`hired-${refreshKey}`} title="Hired" onStatusChange={triggerRefresh}/>
           <Status key={`rejected-${refreshKey}`} title="Rejected" onStatusChange={triggerRefresh}/>
           </div>
           </div>
       </div>
       :
       Custom404()
       }
       </div>
    )
}


function Custom404() {
  return <h1 className="text-center font-bold mt-16">404 - Page Not Found</h1>
}