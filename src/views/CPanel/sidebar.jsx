import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

//Icons Fa
import { FaUser, FaHammer, FaDatabase, FaPen, FaArrowLeft } from "react-icons/fa";
//Icons Hi
import { HiArrowLeft ,HiClipboardList } from "react-icons/hi";
//Images
import Icon from '../../assets/noText-Logo.png'; 
export default function Sidebar({
    setView
}) {

    const [loading, setLoading]=useState(true);
    const [error, setError]=useState('');
    const [isVisible, setVisible]=useState(true)

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
        <>
    {isVisible && (
        <motion.div
            id="CPanelSidebar"
            key="CPanelSidebar"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.4 }}
            className="left-0 fixed"
        >
            <FaArrowLeft
                size={28}
                className="absolute ml-3 mt-3 text-white border p-2 rounded-full hover:bg-white hover:text-violet-700 shadow transition-all cursor-pointer"
                onClick={setVisible(true)}
            />

            <div className="min-h-screen w-56 bg-linear-to-br from-violet-800 via-blue-700 to-slate-900 flex flex-col items-center py-6 px-4">

                <div className="w-full flex justify-center mb-8">
                    <img
                        className="h-24 object-contain"
                        src={Icon}
                        alt="Toucan IT"
                    />
                </div>

                <div className="flex flex-col gap-4 w-full">

                    <button
                        onClick={() => setView(1)}
                        className="group flex items-center gap-3 w-full rounded-xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-4 py-3 text-lg text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105"
                    >
                        <FaUser className="text-xl transition-transform group-hover:scale-125" />
                        <span>Usuários</span>
                    </button>

                    <button
                        onClick={() => setView(4)}
                        className="group flex items-center gap-3 w-full rounded-xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-4 py-3 text-lg text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105"
                    >
                        <FaHammer className="text-xl transition-transform group-hover:rotate-12" />
                        <span>Serviços</span>
                    </button>

                    <button
                        onClick={() => setView(3)}
                        className="group flex items-center gap-3 w-full rounded-xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-4 py-3 text-lg text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105"
                    >
                        <FaDatabase className="text-xl transition-transform group-hover:scale-125" />
                        <span>Agendamentos</span>
                    </button>

                    <button
                        onClick={() => setView(4)}
                        className="group flex items-center gap-3 w-full rounded-xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-4 py-3 text-lg text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105"
                    >
                        <FaPen className="text-xl transition-transform group-hover:-rotate-12" />
                        <span>Dashboard</span>
                    </button>

                    <button
                        onClick={() => setView(5)}
                        className="group flex items-center gap-3 w-full rounded-xl border border-violet-400/40 bg-white/10 backdrop-blur-md px-4 py-3 text-lg text-white shadow-lg transition-all duration-300 hover:bg-violet-600 hover:scale-105"
                    >
                        <HiClipboardList className="text-xl transition-transform group-hover:scale-125" />
                        <span>Financeiro</span>
                    </button>

                </div>

                <button
                    onClick={logOut}
                    className="mt-auto flex items-center gap-2 rounded-xl px-4 py-3 text-lg text-white transition-all duration-300 hover:scale-105 hover:bg-red-500"
                >
                    <HiArrowLeft className="text-xl" />
                    <span>Sair</span>
                </button>

            </div>
        </motion.div>
    )}
</>
    )
}
