import React, {useEffect, useState} from "react";
import Summary from '../views/panel/summary'
import Date from '../views/panel/date'
import Professional from '../views/panel/professional'

export default function Panel() {

    const [error, setError]=useState('');
    const [isLoading, setIsLoading]=useState(true);

    useEffect(() => {
        const handleRefresh = async () => {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                setError("Sessão expirada, faça login novamente!")
            }

            try {
                const response = await fetch(
                    import.meta.env.VITE_APP_BASE_URL + "/auth/refresh", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-Refresh-Token': refreshToken
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

    const [schedule, setSchedule] = useState({
        selectedDay:'',
        time:'',
        scheduleId:'',
        professionalId:{},
        servicos:''
    })


const [view, setView] = useState();

useEffect(() => {
    setView(1);
}, []);

switch (view) {
    case 1:
        return <Date 
            schedule={schedule}
            setSchedule={setSchedule}
            setView={setView}
        />
    case 2:
        return <Professional 
            schedule={schedule}
            setSchedule={setSchedule}
            setView={setView}
        />
    case 3:
        return <Summary 
            schedule={schedule}
            setSchedule={setSchedule}
            setView={setView}
        />
        
}   
}