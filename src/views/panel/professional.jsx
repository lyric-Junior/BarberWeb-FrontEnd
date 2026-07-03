import { div } from "framer-motion/client";
import React, {useState, useEffect} from "react";
import { refreshRequest } from "../../api";
import { motion } from "framer-motion";

export default function Professional({
    schedule,
    setSchedule,
    setView
}) {

    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const selectProfessional = (professional) => {
    setSelectedProfessional(professional.id);

    setSchedule(prev => ({
        ...prev,
        professionalId: professional.id
    }));
};

    useEffect(() => {
    if (error) {
        const timer = setTimeout(() => {
            setView(1);
        }, 2500);

        return () => clearTimeout(timer);
    }
    }, [error, setView]);

    useEffect(() => {
        const loadProfissionais = async() => {
        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await fetch('http://localhost:6050/user/listarProfissionais?data=' + schedule.selectedDay + '&horario=' + schedule.time, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + accessToken
                }
            })

            const data = await response.json();
            setProfessionals(data);
            setLoading(false)

        } catch (err) {
            if (err.status == 401) {
                refreshRequest();           
            }
            setError(err.message || 'Falha interna do servidor')
        } finally {
            console.log(schedule.time)
            console.log(schedule.selectedDay)
        }
    }
    loadProfissionais();
    }, []); 

    return (
           <>
    {loading ? (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-linear-to-br from-violet-700 via-blue-600 to-black flex flex-col justify-center items-center"
        >

            <div className="loadingContainer">
                <div className="loadingCircle"></div>
                <div className="loadingCircleMinor"></div>
                <div className="loadingCircleMajor"></div>
                <div className="loadingCircleReverse"></div>
            </div>

            <p className="text-violet-100 text-3xl mt-8 tracking-widest">
                Carregando profissionais...
            </p>

        </motion.div>

    ) : (

        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-linear-to-br from-violet-700 via-blue-600 to-black flex justify-center items-center px-6"
        >

            <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl border border-violet-400/20 shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-center text-white">
                    Escolha o profissional
                </h1>

                <p className="text-violet-200 text-center mt-3">
                    Selecione quem realizará seu atendimento.
                </p>

                <div className="mt-8 space-y-4">

                    {professionals.map((professional) => (

                        <motion.div
                            key={professional.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: .98 }}
                            onClick={() => selectProfessional(professional)}
                            className={`
                                cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden
                                ${
                                    selectedProfessional === professional.id
                                        ? "bg-violet-600 border-violet-300 shadow-2xl"
                                        : "bg-white/10 border-violet-400/20 hover:bg-violet-500/20"
                                }
                            `}
                        >

                            <div className="flex items-center gap-5 px-6 py-5">

                                <motion.img
                                    layout
                                    src={professional.photo}
                                    alt={professional.username}
                                    animate={{
                                        scale: selectedProfessional === professional.id ? 1.08 : 1
                                    }}
                                    className={`
                                        w-20 h-20 rounded-full object-cover border-4
                                        ${
                                            selectedProfessional === professional.id
                                                ? "border-white"
                                                : "border-violet-400/40"
                                        }
                                    `}
                                />

                                <h2 className="text-2xl font-bold text-white">
                                    {professional.username}
                                </h2>

                            </div>

                        </motion.div>

                    ))}

                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: .97 }}
                    disabled={!selectedProfessional}
                    onClick={() => setView(3)}
                    className="w-full mt-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-900 disabled:cursor-not-allowed text-white text-xl font-semibold"
                >
                    Continuar →
                </motion.button>

            </div>

        </motion.div>

    )}
</>
    )
}