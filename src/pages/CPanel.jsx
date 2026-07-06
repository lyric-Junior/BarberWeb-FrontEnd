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
import Icon from '../assets/noText-Logo.png'
//Paginas
import Schedules from '../views/CPanel/schedules'
import Users from '../views/CPanel/users'

export default function CPanel() {

    const [loading, setLoading]=useState(true);
    const [view, setView]=useState();
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

            const data = await response.json();

            navigate('/');
        } catch (err) {
            setError(err.message || 'nuh uh uh')
        }
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
    <div className='min-h-screen w-100 bg-linear-135 from-violet-700 to-blue-600 flex flex-col justify-around items-center p-5'>
        <div className='h-40 w-full'>
            <img 
            className='h-40'
            src={Icon} alt="No text toucan_it logo" />
        </div>
        <div 
        onClick={() => {setView(1)}} 
        className='w-full h-20 p-5 text-3xl bg-linear-to-t from-violet-800 to-blue-500 border-white border rounded-2xl flex gap-5 text-white hover:scale-[1.08] duration-75'>
          <FaUser />Usuarios
        </div>
        <div 
        onClick={() => {setView(2)}} 
        className='w-full h-20 p-5 text-3xl bg-linear-to-t from-violet-800 to-blue-500 border-white border rounded-2xl flex gap-5 text-white hover:scale-[1.08] duration-75'>
            <FaHammer /> Servicos
        </div>
        <div 
        onClick={() => {setView(3)}} 
        className='w-full h-20 p-5 text-3xl bg-linear-to-t from-violet-800 to-blue-500 border-white border rounded-2xl flex gap-5 text-white hover:scale-[1.08] duration-75'>
           <FaDatabase /> Agendamentos
        </div>
        <div 
        onClick={() => {setView(3)}} 
        className='w-full h-20 p-5 text-3xl bg-linear-to-t from-violet-800 to-blue-500 border-white border rounded-2xl flex gap-5 text-white hover:scale-[1.08] duration-75'>
            <FaPen />DashBoard
        </div>
        <div 
        onClick={() => {setView(3)}} 
        className='w-full h-20 p-5 text-3xl bg-linear-to-t from-violet-800 to-blue-500 border-white border rounded-2xl flex gap-5 text-white hover:scale-[1.08] duration-75'>
           <HiClipboardList /> Finaceiro
        </div>
        <div 
        onClick={() => logOut()} 
        className='w-40 h-20 p-5 text-2xl bg-linear-to-t black grayscale-50 border-white border rounded-2xl flex place-self-start text-white hover:bg-red-500 transition-all'>
            <HiArrowLeft /> Sair
        </div>
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
              className="min-h-screen bg-linearX         -to-br from-violet-700 via-indigo-700 to-black flex flex-col justify-center items-center"
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
        <div>

        </div>
    )
}
    </div>
)
}