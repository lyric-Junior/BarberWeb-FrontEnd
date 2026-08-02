import React, { useState } from "react";
import Sidebar from "./sidebar";

export default function Servicos() {

    const [search, setSearch]=useState('');
    const [isLoading, setIsLoading]=useState('');

    return (
        <div className="flex-1 min-h-screen">

            <Sidebar setView={setView}/>
            
        </div>    
    )
}