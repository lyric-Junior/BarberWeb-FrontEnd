import React, {useEffect, useState} from "react";
import Summary from '../views/panel/summary'
import Date from '../views/panel/date'
import Professional from '../views/panel/professional'

export default function Panel() {

    const [error, setError]=useState('');
    const [isLoading, setIsLoading]=useState(true);

    useEffect(() => {
        const refresh = async() => {
            
            const result = await refresh();
        }
    })

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