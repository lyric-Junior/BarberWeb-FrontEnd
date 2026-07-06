import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";

export default function summary({
    schedule,
    setSchedule,
    setView
}) {

    const [isLoading, setLoading] = useState(true);
    const [apointment, setAppointment] = useState({});
    const [error, setError] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedProfessionalId, setSelectedProfessionalId] = useState('');

    const toggleService = (service) => {

        const exists = selectedServices.some(item => item.id === service.id);

        let updatedServices;

        if (exists) {
            updatedServices = selectedServices.filter(item => item.id !== service.id);
        } else {
            updatedServices = [...selectedServices, service];
        }

    setSelectedServices(updatedServices);

    const total = updatedServices.reduce((sum, item) => sum + item.valor, 0);

    setTotal(total);

}

useEffect(()=> {
    const pickOneAppointment = async() => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`http://localhost:6050/user/pickOneAppointment?data=${schedule.selectedDay}&horario=${schedule.time}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + accessToken
                }
            })

            const data = await response.json();

            console.log(data);
            setAppointment(data);

            setIsLoading(false);
        } catch (err) {
            setError(err.message || 'Internal server error!');
        }
    }

    pickOneAppointment();
    }, [])

    const confirmAppointment = async () => {

    const body = {

        id: appointment.id,
        professional: appointment.profissional.id,
        services: selectedServices.map(service => service.id)
    };

    const accessToken = localStorage.getItem('accessToken')
    try {
        const response = await fetch(`http://localhost:6050/user/definirHorario`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + accessToken
            },
            body: body
        })
    } catch (err) {
        setError(err.message || 'Nuh uh uh')
    }
}
    

    return (
        <div className="min-h-screen bg-linear-to-br from-violet-700 via-blue-600 to-black flex items-center justify-center p-6">

    {isLoading ? (
<motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .4 }}
                    className="min-h-screen bg-linear-to-br from-violet-700 via-blue-600 to-black flex flex-col justify-center items-center"
                >

                    <div className="loadingContainer">

                        <div className="loadingCircle"></div>
                        <div className="loadingCircleMinor"></div>
                        <div className="loadingCircleMajor"></div>
                        <div className="loadingCircleReverse"></div>

                    </div>

                    <p className="text-violet-100 text-3xl mt-10 tracking-widest">
                        Carregando horários...
                    </p>

                </motion.div>
    ) : (

        <div className="w-full max-w-5xl bg-black/40 backdrop-blur-xl rounded-3xl border border-violet-500 shadow-2xl p-8">

            <h1 className="text-4xl text-violet-100 font-bold text-center mb-10">
                Confirmar Agendamento
            </h1>

            <div className="grid md:grid-cols-2 gap-10">

                <div className="flex flex-col items-center">

                    <img
                        src={`data:image/jpeg;base64,${appointment.profissional.foto}`}
                        alt=""
                        className="w-44 h-44 rounded-full object-cover border-4 border-violet-500 shadow-xl"
                    />

                    <h2 className="mt-5 text-2xl text-white font-semibold">
                        {appointment.profissional.username}
                    </h2>

                    <span className="text-violet-300">
                        Profissional selecionado
                    </span>

                </div>

                <div className="space-y-5">

                    <div className="bg-black/30 rounded-xl p-5">

                        <p className="text-violet-300">
                            Data
                        </p>

                        <h2 className="text-white text-xl">
                            {appointment.data}
                        </h2>

                    </div>

                    <div className="bg-black/30 rounded-xl p-5">

                        <p className="text-violet-300">
                            Horário
                        </p>

                        <h2 className="text-white text-xl">
                            {appointment.horario}
                        </h2>

                    </div>

                </div>

            </div>

            <div className="mt-10">

                <h2 className="text-2xl font-semibold text-violet-200 mb-5">
                    Escolha os serviços
                </h2>

                <div className="space-y-3">

                    {servicos.map(service => (

                        <div
                            key={service.id}
                            onClick={() => toggleService(service)}
                            className={`rounded-xl p-5 cursor-pointer transition border flex justify-between items-center

                            ${
                                selectedServices.some(item => item.id === service.id)

                                ? 'border-violet-400 bg-violet-700/30'

                                : 'border-violet-900 bg-black/30 hover:bg-black/40'
                            }`}

                        >

                            <div>

                                <h3 className="text-white text-lg">
                                    {service.nome}
                                </h3>

                                <p className="text-violet-300">
                                    {service.descricao}
                                </p>

                            </div>

                            <div className="text-right">

                                <h2 className="text-xl font-bold text-violet-200">

                                    R$ {service.valor.toFixed(2)}

                                </h2>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            <div className="mt-8 bg-black/30 rounded-xl border border-violet-700 p-6">

                <div className="flex justify-between">

                    <span className="text-violet-200 text-xl">

                        Serviços selecionados

                    </span>

                    <span className="text-white text-xl">

                        {selectedServices.length}

                    </span>

                </div>

                <div className="mt-3">

                    {selectedServices.map(service => (

                        <div
                            key={service.id}
                            className="flex justify-between text-violet-100 py-1"
                        >

                            <span>

                                {service.nome}

                            </span>

                            <span>

                                R$ {service.valor.toFixed(2)}

                            </span>

                        </div>

                    ))}

                </div>

                <hr className="my-4 border-violet-700"/>

                <div className="flex justify-between">

                    <span className="text-2xl font-bold text-violet-100">

                        Total

                    </span>

                    <span className="text-3xl font-bold text-green-400">

                        R$ {total.toFixed(2)}

                    </span>

                </div>

            </div>

            <div className="flex justify-between mt-10">

                <button
                    onClick={() => setView(2)}
                    className="px-8 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white"
                >
                    Voltar
                </button>

                <button
                    onClick={confirmAppointment}
                    className="px-10 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-xl"
                >
                    Confirmar Agendamento
                </button>

            </div>

        </div>

    )}

</div>
    )
}