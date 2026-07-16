import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

//Icons
import { HiArrowLeft } from "react-icons/hi";
import { FaUser } from 'react-icons/fa';
import { FaHammer } from 'react-icons/fa';
import { FaDatabase } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { HiClipboardList } from "react-icons/hi";
//Images
import Icon from '../../assets/noText-Logo.png'; 
export default function Sidebar({
    setView
}) {

    const [loading, setLoading]=useState(true);
    const [error, setError]=useState('');

    const navigate = useNavigate();

    const logOut = async() => {
        setLoading(true);
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`http://localhost:6050/auth/logout`, {
                method: 'POST',
                headers:{
                    'X-Refresh-Token': refreshToken,
                    'Authorization':'Bearer ' + accessToken
                }
            })
        } catch (err) {
            setError(err.message || 'nuh uh uh')
        }
    }

    return (
        <motion.div
        key='CPanelSidebar'
        initial={{ opacity: 0, x:-200 }}
        animate={{ opacity: 1, x:0 }}
        exit={{ opacity: 0, x:-200 }}
        transition={{ duration: 0.4 }}
        className="left-0"
        >
    <div className="min-h-screen w-80 bg-linear-to-br from-violet-800 via-blue-700 to-slate-900 flex flex-col items-center py-8 px-5">

    <div className="w-full flex justify-center mb-10">
        <img
            className="h-36 object-contain"
            src={Icon}
            alt="Toucan IT"
        />
    </div>

    <div className="flex flex-col gap-5 w-full">

        <button
            onClick={() => setView(1)}
            className="group flex items-center gap-5 w-full rounded-2xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-6 py-4 text-2xl text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105 hover:shadow-violet-500/40"
        >
            <FaUser className="text-3xl transition-transform group-hover:scale-125" />
            <span>Usuários</span>
        </button>

        <button
            onClick={() => setView(2)}
            className="group flex items-center gap-5 w-full rounded-2xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-6 py-4 text-2xl text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105 hover:shadow-violet-500/40"
        >
            <FaHammer className="text-3xl transition-transform group-hover:rotate-12" />
            <span>Serviços</span>
        </button>

        <button
            onClick={() => setView(1)}
            className="group flex items-center gap-5 w-full rounded-2xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-6 py-4 text-2xl text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105 hover:shadow-violet-500/40"
        >
            <FaDatabase className="text-3xl transition-transform group-hover:scale-125" />
            <span>Agendamentos</span>
        </button>

        <button
            onClick={() => setView(4)}
            className="group flex items-center gap-5 w-full rounded-2xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-6 py-4 text-2xl text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105 hover:shadow-violet-500/40"
        >
            <FaPen className="text-3xl transition-transform group-hover:-rotate-12" />
            <span>Dashboard</span>
        </button>

        <button
            onClick={() => setView(5)}
            className="group flex items-center gap-5 w-full rounded-2xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-6 py-4 text-2xl text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105 hover:shadow-violet-500/40"
        >
            <HiClipboardList className="text-3xl transition-transform group-hover:scale-125" />
            <span>Financeiro</span>
        </button>

    </div>

    <button
        onClick={logOut}
        className="mt-auto flex items-center gap-3 rounded-2xl   px-6 py-4 text-xl text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-500 "
    >
        <HiArrowLeft className="text-2xl" />
        Sair
    </button>

</div>
    </motion.div>
    )
}
