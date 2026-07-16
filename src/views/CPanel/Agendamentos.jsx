import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

//Sidebar import
import Sidebar from './sidebar';

export default function Agendamentos({setView}) {

    const [users, setUsers]=useState([]);
    const [error, setError]=useState('');
    const [loading, setLoading]=useState('');

    useEffect(() => {
        const handleUsers = async() => {
            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await fetch('http://localhost:6050/admin/listarUsuarios', {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization':'Bearer ' + accessToken
                    }
                })

                const data = await response.json();

                setUsers(data);
                console.log(data);
            } catch(err){
                setError(err.message || 'nope');
            }
        }
    }, [])

    return (
        <div className="flex min-h-screen min-w-screen bg-linear-135">
            <div className="left-0">
                <Sidebar setView={setView} />
            </div>
            <div id='SchedulesContainer' className="flex">
                <motion.div
                key='CPanelSidebar'
                initial={{ opacity: 0, x:-200 }}
                animate={{ opacity: 1, x:0 }}
                exit={{ opacity: 0, x:-200 }}
                transition={{ duration: 0.4 }}
                className="p-5" 
                >
                    <div className="flex justify-around items-center p-3 shadow rounded-3xl border  ">
                        <div className="flex justify-around items-center p-3 ">
                            <div className="flex flex-col justify-around items-center rounded-2xl shadow-2xs bg-white text-">
                                <h1>Usuarios listados:</h1><br />
                                <h2>{users.length}</h2>
                            </div>
                            <div className="flex justify-end">
                                
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}