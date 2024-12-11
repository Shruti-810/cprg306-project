'use client'
import Status from "./status"
import Navbar from "../navbar"
import { useState } from "react";

export default function Page(){

  const [refreshKey, setRefreshKey] = useState(0); 


  const triggerRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };


    return(
        <div>
            <Navbar />
            <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Status title="Applied" onStatusChange={triggerRefresh}/>
          <Status title="Interviewed" onStatusChange={triggerRefresh}/>
          <Status title="Hired" onStatusChange={triggerRefresh}/>
          <Status title="Rejected" onStatusChange={triggerRefresh}/>
        </div>
      </div>



  


        </div>
    )
}