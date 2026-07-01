import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SelectSchedule({ schedule, setSchedule,setView }) {

    const [loading, setLoading] = useState(true);
    const [horarios, setHorarios] = useState([]);

    const [error, setError] = useState("");

   const today = new Date();

   //Today and Tomorrow consts
    const todayDate = today.toISOString().split("T")[0];
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    function selectToday() {

        setSchedule(prev => ({
            ...prev,
            date: todayDate
        }));

        console.log(todayDate)

    }

    function selectTomorrow() {

        setSchedule(prev => ({
            ...prev,
            date: tomorrowDate 
        }));

    }
    console.log(tomorrowDate)
useEffect(() => {
    const loadTimes = async () => {
            setLoading(true);
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://localhost:6050/user/listarHorariosDisponiveis?data=${schedule.selectedDay}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    }
                })

                const data = await response.json();

                setHorarios(data);

            }catch(err) {
                setError(err.message || "Bad request")
            }finally {
                setLoading(false);
            }
        }
        loadTimes();
}, [])
    

        setView(1);

    return (

        <AnimatePresence mode="wait">

            {loading ? (

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

                <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .45 }}
                    className="min-h-screen bg-linear-to-br from-violet-700 via-blue-600 to-black flex justify-center items-center px-6"
                >

                    <motion.div
                        initial={{ scale: .95 }}
                        animate={{ scale: 1 }}
                        className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl border border-violet-400/20 shadow-2xl p-8"
                    >

                        <h1 className="text-4xl font-bold text-center text-white">
                            Escolha um horário
                        </h1>

                        <p className="text-violet-200 text-center mt-3">
                            Selecione o melhor momento para seu atendimento.
                        </p>

                        <div className="flex gap-4 mt-8">

                            <button

                                onClick={selectToday(), loadTimes()}

                                className={`flex-1 py-4 rounded-xl transition font-semibold

                                    ${
                                        schedule(prev => ({
                                            ...prev,
                                        }))
                                            
                                            ? "bg-violet-600 text-white"

                                            : "bg-white/10 text-violet-200 hover:bg-violet-500/20"

                                    }

                                `}
                            >
                                Hoje
                            </button>

                            <button

                                onClick={selectTomorrow(), loadTimes()}

                                className={`flex-1 py-4 rounded-xl transition font-semibold

                                    ${
                                        selectedDay === "tomorrow"

                                            ? "bg-violet-600 text-white"

                                            : "bg-white/10 text-violet-200 hover:bg-violet-500/20"

                                    }

                                `}
                            >
                                Amanhã
                            </button>

                        </div>

                        <div className="mt-8 h-80 overflow-y-auto rounded-2xl bg-black/20 border border-violet-500/20">

                            {horarios.map(hora => (

                                <motion.button

                                    whileHover={{ scale: 1.03 }}

                                    whileTap={{ scale: .97 }}

                                    key={hora}

                                    onClick={setSchedule(prev => ({
                                        ...prev,
                                        date:hora
                                    }))}

                                    className={`
                                        w-full
                                        py-5
                                        text-xl
                                        transition-all
                                        duration-200

                                        ${
                                            selectedTime === hora

                                            ? "bg-violet-600 text-white font-bold shadow-lg"

                                            : "text-violet-100 hover:bg-violet-500/20"

                                        }

                                    `}
                                >

                                    {hora}

                                </motion.button>

                            ))}

                        </div>
{error && (
    <div className="mt-4 rounded-lg bg-red-500/20 border border-red-400/40 p-3">
        <p className="text-red-200 text-center">
            {error}
        </p>
    </div>
)}
                        <motion.button

                            whileHover={{ scale: 1.02 }}

                            whileTap={{ scale: .97 }}

                            disabled={!selectedTime}

                            onClick={setView(2)}

                            className="w-full mt-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-900 disabled:cursor-not-allowed text-white text-xl font-semibold"

                        >

                            Continuar →

                        </motion.button>

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>

    );

}