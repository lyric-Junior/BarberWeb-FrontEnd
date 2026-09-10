import { motion } from 'framer-motion';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//Views
import Users from '../views/CPanel/Users.jsx';
import Dashboard from '../views/CPanel/Dashboard';
import Financeiro from '../views/CPanel/Financeiro';
import Servicos from '../views/CPanel/Servicos';
import Agendamentos from '../views/CPanel/Agendamentos';

import Sidebar from '../views/CPanel/sidebar';

export default function CPanel() {

    const [view, setView]=useState();
    const [error, setError]=useState('');

    useEffect(() => {
        const handleRefresh = async() => {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
            setError("Sessão expirada, faça login novamente!")
        }
        
        try {
            const response = await fetch('http://localhost:6050/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-type':'application/json',
                    'X-Refresh-Token':refreshToken
                }
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
            } else if (!response.ok) {
                //Não chame o refresh novamente!
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                setError("Sessão expirada, faça login novamente!")
            }

        } catch (err) {
            setError(err.message || 'Connection refused!')
        }
    }
    
    handleRefresh();
    const intervalo = setInterval(handleRefresh, 8 * 60 * 1000);
    setView(1);

    return () => {
        clearInterval(intervalo);
    }
    
    }, [])
    
        return (
            <div className="flex">

                <Sidebar setView={setView}/>

                <div className='w-full'>
                    {view === 1 && <Users />}
                    {view === 2 && <Servicos/>}
                    {view === 3 && <Agendamentos />}
                    {view === 4 && <Dashboard />}
                    {view === 5 && <Financeiro />}     
                </div>
            </div>

        )
}