import React, { useState } from "react";
import Sidebar from "./sidebar";

export default function Servicos() {

    const [search, setSearch]=useState('');
    const [isLoading, setIsLoading]=useState('');

    return (
        <div className="flex">
            <div className="main">
                <div id="searchDiv" className="flex flex-col justify-around align-bottom">
                    <div id="searchBar" className="flex rounded-3xl align-middle">
                        <input type="text" value="Pesquise aqui!"
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200 font-medium"
                            placeholder="Nome de usuário" />
                    </div>
                </div>
            </div>

        </div>  
    )
}