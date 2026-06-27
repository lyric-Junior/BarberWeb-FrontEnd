import React, {useEffect, useState} from "react";
import Home from '../views/date'
import Summary from '../views/summary'

export default function Panel() {

    const [error, setError]=useState('');
    const [isLoading, setIsLoading]=useState(true);

    useEffect(() => {
        const refresh = async() => {
            
            const result = await refresh();
        }
    })


const [view, setView] = useState("home");

    return (
        <div className="">

        </div>
    );
}