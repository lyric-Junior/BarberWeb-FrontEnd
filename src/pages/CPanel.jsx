import { motion } from 'framer-motion';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//Icons
import { HiArrowLeft } from "react-icons/hi";
import { FaUser } from 'react-icons/fa';
import { FaHammer } from 'react-icons/fa';
import { FaDatabase } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { HiClipboardList } from "react-icons/hi";
//Images
import Icon from '../assets/noText-Logo.png';
//Views
import Schedules from '../views/CPanel/Agendamentos';
import Users from '../views/CPanel/Users';
import Dashboard from '../views/CPanel/Dashboard';
import Financeiro from '../views/CPanel/Financeiro';
import Servicos from '../views/CPanel/Servicos';

export default function CPanel() {

    const [loading, setLoading]=useState(true);
    const [view, setView]=useState(1);
    const [error, setError]=useState('');

    const navigate = useNavigate();

    const logOut = async() => {
        setLoading(true);
        const refreshToken = localStorage('refreshToken');
        const accessToken = localStorage('accessToken');
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

    const views = {
        1:<Users 
            setView={() => setView()}
            setError={() => setError('')}
        />,
        2:<Servicos />,
        3:<Schedules />,
        4:<Dashboard />,
        5:<Financeiro />
}
    
    return (
        <div>
        <motion.div
        key='CPanelSidebar'
        initial={{ opacity: 0, x:-200 }}
        animate={{ opacity: 1, x:0 }}
        exit={{ opacity: 0, x:-200 }}
        transition={{ duration: 0.4 }}
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
            onClick={() => setView(3)}
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
    {loading ? (
        <div>
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen bg-linearX-to-br from-violet-700 via-indigo-700 to-black flex flex-col justify-center items-center"
            >
              <div className="loadingContainer">
                <div className="loadingCircle"></div>
                <div className="loadingCircleMinor"></div>
                <div className="loadingCircleMajor"></div>
                <div className="loadingCircleReverse"></div>
            
                {/* Núcleo */}
                <div className="w-4 h-4 rounded-full bg-violet-300 shadow-[0_0_30px_#c084fc]"></div>
              </div>
            
              <h1 className="mt-10 text-3xl font-semibold tracking-widest text-violet-100">
                Loading...
              </h1>
            </motion.div>
        </div>
    ) : (
        <div className='flex-1'>
            {views[view]}
        </div>
    )
}
    </div>
)
}