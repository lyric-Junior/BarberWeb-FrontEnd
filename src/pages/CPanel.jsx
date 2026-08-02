import { motion } from 'framer-motion';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//Views
import Schedules from '../views/CPanel/Agendamentos';
import Users from '../views/CPanel/Users';
import Dashboard from '../views/CPanel/Dashboard';
import Financeiro from '../views/CPanel/Financeiro';
import Servicos from '../views/CPanel/Servicos';
import Agendamentos from '../views/CPanel/Agendamentos';

export default function CPanel() {

    const [view, setView]=useState();
    const [error, setError]=useState('');

    useEffect(() => {
        setView(5);
    }, []);

    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        const handleRefresh = async() => {
        try {
            const response = await fetch('http://localhost:6050/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-type':'application/json',
                    'X-Refresh-Token':refreshToken
                }
            });

            const data = await response.json();

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

        } catch (err) {
            setError(err.message || 'Connection refused!')
        }
    }
    }, [])
    
    switch (view) {
        case 1: 
            return (<Agendamentos setView={setView}/>)
        case 2:
            return (<Dashboard setView={setView}/>)
        case 3:
            return (<Financeiro setView={setView}/>)
        case 4:
            return (<Servicos setView={setView}/>)
        case 5:
            return (<Users setView={setView}/>)
    }
}